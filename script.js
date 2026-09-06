/* ==========================================
       TELEGRAM DESTINATION
       Replace YOUR_TELEGRAM_LINK
    ========================================== */

    const TELEGRAM_URL =
      'https://t.me/+3nA2sI2M1JQ4YTdl';



    /* Automatic theme rotation — every 3 seconds */

    const themes = [

      {
        name:'Purple Pink',
        bg:'#1a0533,#2d0a5e,#4a0080,#1a0533',
        orb1:'#9b5de5',
        orb2:'#f72585'
      },

      {
        name:'Ocean Blue',
        bg:'#03045e,#023e8a,#0077b6,#03045e',
        orb1:'#0096c7',
        orb2:'#00b4d8'
      },

      {
        name:'Sunset Fire',
        bg:'#370617,#6a040f,#9d0208,#370617',
        orb1:'#f77f00',
        orb2:'#d62828'
      },

      {
        name:'Mint Teal',
        bg:'#004643,#007c77,#0d6e6e,#004643',
        orb1:'#06d6a0',
        orb2:'#118ab2'
      },

      {
        name:'Rose Gold',
        bg:'#2d0a0a,#5c1a1a,#8b2020,#2d0a0a',
        orb1:'#ff6b6b',
        orb2:'#ff8e53'
      },

      {
        name:'Berry Bliss',
        bg:'#1e0533,#3b0764,#581c87,#1e0533',
        orb1:'#7b2ff7',
        orb2:'#ec4899'
      },

      {
        name:'Midnight Blue',
        bg:'#10002b,#240046,#3c096c,#10002b',
        orb1:'#5e60ce',
        orb2:'#7400b8'
      },

      {
        name:'Golden Hour',
        bg:'#1a0a00,#3d1a00,#6b2d00,#1a0a00',
        orb1:'#f4a261',
        orb2:'#ffd166'
      },

      {
        name:'Aurora Green',
        bg:'#081c15,#1b4332,#2d6a4f,#081c15',
        orb1:'#52b788',
        orb2:'#40916c'
      },

      {
        name:'Neon Cyber',
        bg:'#03001c,#0d0221,#1a0533,#03001c',
        orb1:'#f72585',
        orb2:'#4cc9f0'
      },

      {
        name:'Coral Dream',
        bg:'#2d0016,#5c0029,#8b003e,#2d0016',
        orb1:'#ff6392',
        orb2:'#ff4d6d'
      },

      {
        name:'Electric Lime',
        bg:'#031d0a,#073b1a,#0a5c2a,#031d0a',
        orb1:'#b5e48c',
        orb2:'#52b788'
      }

    ];

    const textThemes = [

      {
        t1:'#ffffff',
        t2:'#ffe066',
        t3:'#ffb347'
      },

      {
        t1:'#00f5ff',
        t2:'#ffffff',
        t3:'#c0f0ff'
      },

      {
        t1:'#ff79c6',
        t2:'#ffffff',
        t3:'#bd93f9'
      },

      {
        t1:'#f8ff00',
        t2:'#ffdd57',
        t3:'#ff9500'
      },

      {
        t1:'#69ff47',
        t2:'#c0f0ff',
        t3:'#ffffff'
      },

      {
        t1:'#ff4ff8',
        t2:'#ffffff',
        t3:'#00e5ff'
      },

      {
        t1:'#ffd700',
        t2:'#ffffff',
        t3:'#ffa500'
      },

      {
        t1:'#ffffff',
        t2:'#a0ffef',
        t3:'#00e5ff'
      },

      {
        t1:'#ff9de2',
        t2:'#ffffff',
        t3:'#ffdd57'
      },

      {
        t1:'#7afcff',
        t2:'#ffd300',
        t3:'#ffffff'
      },

      {
        t1:'#ffffff',
        t2:'#ff79c6',
        t3:'#ff2d78'
      },

      {
        t1:'#e8ff8b',
        t2:'#ffffff',
        t3:'#72ffb6'
      }

    ];

    const mainCard = document.getElementById('mainCard');
    const avatarRing = document.getElementById('avatarRing');
    const liveBadge = document.getElementById('liveBadge');
    const titleEl = document.getElementById('mainTitle');
    const btn = document.getElementById('joinBtn');
    const footerBrand = document.getElementById('footerBrand');

    function applyTheme(theme, textTheme) {
      const p = theme.bg.split(',');
      const bg = `linear-gradient(160deg, ${p[0]} 0%, ${p[1]} 35%, ${p[2]} 65%, ${p[3]} 100%)`;
      const textGrad = `linear-gradient(135deg, ${textTheme.t1} 0%, ${textTheme.t2} 50%, ${textTheme.t3} 100%)`;
      const textGradR = `linear-gradient(135deg, ${textTheme.t3} 0%, ${textTheme.t2} 50%, ${textTheme.t1} 100%)`;
      const btnGrad = `linear-gradient(135deg, ${theme.orb1} 0%, ${theme.orb2} 100%)`;
      document.body.style.background = bg;
      mainCard.style.boxShadow = `0 8px 60px ${theme.orb1}55, 0 2px 20px ${theme.orb2}33, inset 0 1px 0 rgba(255,255,255,.20)`;
      avatarRing.style.background = btnGrad;
      avatarRing.style.boxShadow = `0 0 0 3px ${theme.orb1}44, 0 8px 32px ${theme.orb2}55`;
      liveBadge.style.background = btnGrad;
      titleEl.style.backgroundImage = textGrad;
      btn.style.background = btnGrad;
      btn.style.boxShadow = `0 4px 24px ${theme.orb2}80, inset 0 1px 0 rgba(255,255,255,.20)`;
      footerBrand.style.backgroundImage = textGrad;
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).style.backgroundImage = textGrad);
      ['sep1','sep2','sep3'].forEach(id => document.getElementById(id).style.backgroundImage = textGradR);
      let s = document.getElementById('dynamicThemeStyle');
      if (!s) { s=document.createElement('style'); s.id='dynamicThemeStyle'; document.head.appendChild(s); }
      s.textContent = `body::before{background:radial-gradient(circle,${theme.orb1} 0%,transparent 70%)} body::after{background:radial-gradient(circle,${theme.orb2} 0%,transparent 70%)}`;
    }

    let themeIndex = Math.floor(Math.random()*themes.length);
    let textThemeIndex = Math.floor(Math.random()*textThemes.length);
    applyTheme(themes[themeIndex], textThemes[textThemeIndex]);
    setInterval(() => {
      themeIndex=(themeIndex+1)%themes.length;
      textThemeIndex=(textThemeIndex+1)%textThemes.length;
      applyTheme(themes[themeIndex], textThemes[textThemeIndex]);
    },3000);

    /* ==========================================
       NEUTRAL STATUS TIMER
       It does NOT redirect visitors.
    ========================================== */

    let totalSeconds = 5;

    function pad(n) {
      return String(n).padStart(2,'0');
    }

    function updateTimer() {

      document.getElementById('cd-days')
        .textContent =
        pad(Math.floor(totalSeconds / 86400));

      document.getElementById('cd-hours')
        .textContent =
        pad(
          Math.floor(
            (totalSeconds % 86400) / 3600
          )
        );

      document.getElementById('cd-mins')
        .textContent =
        pad(
          Math.floor(
            (totalSeconds % 3600) / 60
          )
        );

      document.getElementById('cd-secs')
        .textContent =
        pad(totalSeconds % 60);

      if (totalSeconds > 0) {

        totalSeconds--;

      } else {

        clearInterval(timerInterval);

        document.getElementById('cd-secs')
          .textContent = '00';

        windoww.location.href = TELEGRAM_URL;

      }

    }

    updateTimer();

    const timerInterval =
      setInterval(updateTimer,1000);


    /* ==========================================
       TELEGRAM BUTTON
       Visitor must click manually.
    ========================================== */

    btn.addEventListener('click',function(e) {

      if (typeof fbq === 'function') {

        fbq(
          'track',
          'Subscribe'
        );

      }


      /* Ripple animation */

      const ripple =
        document.createElement('span');

      ripple.classList.add('ripple');

      const rect =
        btn.getBoundingClientRect();

      const size =
        Math.max(
          rect.width,
          rect.height
        );

      ripple.style.width =
        ripple.style.height =
        size + 'px';

      ripple.style.left =
        (
          e.clientX -
          rect.left -
          size / 2
        ) + 'px';

      ripple.style.top =
        (
          e.clientY -
          rect.top -
          size / 2
        ) + 'px';

      btn.appendChild(ripple);

      setTimeout(
        () => ripple.remove(),
        700
      );

    });
