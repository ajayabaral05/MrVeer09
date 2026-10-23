<?php
declare(strict_types=1);

/*
 * Meta Conversions API endpoint for the Join Telegram Subscribe event.
 * Keep config.php private and never place your access token in HTML/JavaScript.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

/* Basic same-origin protection. Configure your site to use HTTPS. */
$host = strtolower((string)($_SERVER['HTTP_HOST'] ?? ''));
$origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if ($host === '' || $origin === '') {
    respond(403, ['ok' => false, 'error' => 'Missing origin']);
}
$originHost = strtolower((string)parse_url($origin, PHP_URL_HOST));
if ($originHost === '' || !hash_equals($host, $originHost)) {
    respond(403, ['ok' => false, 'error' => 'Invalid origin']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 12000) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}
$input = json_decode($raw, true);
if (!is_array($input)) {
    respond(400, ['ok' => false, 'error' => 'Invalid JSON']);
}

$eventId = (string)($input['event_id'] ?? '');
if (!preg_match('/^[A-Za-z0-9_-]{8,100}$/', $eventId)) {
    respond(400, ['ok' => false, 'error' => 'Invalid event ID']);
}

/* Load private credentials/configuration. */
$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    respond(500, ['ok' => false, 'error' => 'Server configuration missing']);
}
$config = require $configPath;
if (!is_array($config)) {
    respond(500, ['ok' => false, 'error' => 'Invalid server configuration']);
}

$pixelId = trim((string)($config['pixel_id'] ?? ''));
$accessToken = trim((string)($config['access_token'] ?? ''));
$apiVersion = trim((string)($config['api_version'] ?? 'v25.0'));
$testEventCode = trim((string)($config['test_event_code'] ?? ''));

if ($pixelId === '' || !ctype_digit($pixelId) ||
    $accessToken === '' || $accessToken === 'PASTE_YOUR_META_CAPI_ACCESS_TOKEN_HERE') {
    respond(503, ['ok' => false, 'error' => 'Add your Meta Pixel ID and CAPI access token in config.php']);
}
if (!preg_match('/^v[0-9]+\.[0-9]+$/', $apiVersion)) {
    respond(500, ['ok' => false, 'error' => 'Invalid Graph API version']);
}

/* Only accept a source URL on this same host; do not trust arbitrary URLs. */
$sourceUrl = (string)($input['event_source_url'] ?? '');
$sourceHost = strtolower((string)parse_url($sourceUrl, PHP_URL_HOST));
if ($sourceHost === '' || !hash_equals($host, $sourceHost)) {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $sourceUrl = $scheme . '://' . $host . '/';
}

/* Basic event matching fields; do not collect or fabricate personal identifiers. */
$userData = [
    'client_user_agent' => substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 1000),
];
$remoteIp = (string)($_SERVER['REMOTE_ADDR'] ?? '');
if (filter_var($remoteIp, FILTER_VALIDATE_IP)) {
    $userData['client_ip_address'] = $remoteIp;
}
foreach (['fbp', 'fbc'] as $cookieName) {
    $value = (string)($input[$cookieName] ?? '');
    if ($value !== '' && strlen($value) <= 500 && preg_match('/^[A-Za-z0-9._:-]+$/', $value)) {
        $userData[$cookieName] = $value;
    }
}

$event = [
    'event_name' => 'Subscribe',
    'event_time' => time(),
    'event_id' => $eventId,
    'action_source' => 'website',
    'event_source_url' => $sourceUrl,
    'user_data' => $userData,
    'custom_data' => [
        'value' => 0.00,
        'currency' => 'INR',
        'predicted_ltv' => 0.00,
    ],
];
$payload = ['data' => [$event]];
if ($testEventCode !== '') {
    $payload['test_event_code'] = $testEventCode;
}

if (!function_exists('curl_init')) {
    respond(500, ['ok' => false, 'error' => 'PHP cURL extension is not enabled on this hosting']);
}
$url = 'https://graph.facebook.com/' . $apiVersion . '/' . rawurlencode($pixelId) .
       '/events?access_token=' . rawurlencode($accessToken);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
]);
$response = curl_exec($ch);
$curlError = curl_error($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $curlError !== '') {
    error_log('Meta CAPI request failed: ' . $curlError);
    respond(502, ['ok' => false, 'error' => 'Meta request failed']);
}
$decoded = json_decode((string)$response, true);
if ($status < 200 || $status >= 300 || !is_array($decoded) || isset($decoded['error'])) {
    error_log('Meta CAPI rejected event. HTTP ' . $status . '; response: ' . substr((string)$response, 0, 1500));
    respond(502, ['ok' => false, 'error' => 'Meta rejected the event', 'http_status' => $status]);
}
respond(200, ['ok' => true, 'events_received' => (int)($decoded['events_received'] ?? 0)]);
