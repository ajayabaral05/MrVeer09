TRADER KALL — Meta Pixel + Conversions API package
===================================================

FILES
-----
index.html      Your existing landing page, updated to send matching browser/server Subscribe events.
meta-capi.php   Server endpoint that sends the Subscribe event to Meta Conversions API.
config.php      Private configuration. Add your CAPI access token here.
.htaccess       Blocks direct access to config.php and disables directory listings.

INSTALL ON HOSTINGER
--------------------
1. Back up the current website files first.
2. In Hostinger File Manager, open the website's public_html folder.
3. Upload the ZIP and extract it into public_html, or upload the files individually.
4. Ensure index.html, meta-capi.php, config.php and .htaccess are in the same public_html folder.
5. Edit config.php and replace:
   PASTE_YOUR_META_CAPI_ACCESS_TOKEN_HERE
   with your real token from Meta Events Manager > your Pixel/Dataset > Settings > Conversions API.
   Do not share the token or put it in HTML/JavaScript.
6. Keep pixel_id as 1076862584980785 unless you intentionally use a different Pixel.
7. Use HTTPS on your domain.
8. Confirm your Hostinger PHP version supports cURL. Most standard PHP hosting plans do; if not, enable it or contact Hostinger.
9. Visit your page and click Join Telegram once. Check Meta Events Manager > Test Events / Diagnostics.
10. If using Test Events, put the Test Event Code in config.php before testing. Clear it after testing.

EVENT DEDUPLICATION
-------------------
On a Join click, the browser Pixel and PHP endpoint receive the same event ID.
Meta can deduplicate them when both events reach the same Pixel/dataset with matching event name and event ID.
This package sends Subscribe only on the manual Join click. The countdown redirect does not send Subscribe.

IMPORTANT NOTES
---------------
- This does not retroactively repair historical coverage or guarantee that Meta will immediately clear the warning.
- Server events may still be rejected if the access token, Pixel permissions, API version, hosting configuration, or event data is invalid.
- This integration sends client IP and browser user-agent, plus _fbp/_fbc cookies when available. Use appropriate consent/privacy notices for your jurisdiction.
- The browser-side one-click lock resets on page refresh, as in your original page. This is not a security boundary; server-side events can be retried by a client. Event IDs are for deduplication, not fraud prevention.
- Do not publicly expose config.php or the access token. The included .htaccess blocks direct access on Apache/LiteSpeed; if your server uses a different configuration, ensure config.php is protected.
- The existing automatic redirect timer remains as it was in your uploaded file (60 seconds in the JavaScript), and the Telegram destination/theme/design are preserved.

TROUBLESHOOTING
---------------
- HTTP 503 / "Add your Meta Pixel ID..." means config.php still has the placeholder token.
- HTTP 403 / "Missing origin" or "Invalid origin": use the page from your own HTTPS domain and ensure the endpoint is same-origin.
- HTTP 502 / "Meta rejected the event": check Hostinger PHP error logs and Meta Events Manager; server logs contain the Meta API response.
- If no server event arrives, test https://your-domain.example/meta-capi.php in a browser: GET should return Method not allowed (405), which confirms PHP is executing. Do not expect a successful event from a GET request.
