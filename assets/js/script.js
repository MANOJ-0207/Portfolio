document.addEventListener('DOMContentLoaded', () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const logo = document.getElementById('logoImg');
  const profile = document.getElementById('profile-img');
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const gridRows = document.querySelectorAll('.grid-container .row');
  const isSmallViewport = () => window.matchMedia('(max-width: 1000px)').matches;
  const safeAddClass = (el, cls) => el && el.classList.add(cls);
  const safeRemoveClass = (el, cls) => el && el.classList.remove(cls);
  const safeHasClass = (el, cls) => el && el.classList.contains(cls);

  function fadeSwapImage(imgElement, newSrc, fadeDuration = 200) {
    if (!imgElement) return;
    try {
      imgElement.style.transition = imgElement.style.transition || `opacity ${fadeDuration}ms ease`;
      imgElement.style.opacity = 0;
      setTimeout(() => {
        const tmp = new Image();
        tmp.src = newSrc;
        tmp.onload = () => {
          imgElement.src = newSrc;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              imgElement.style.opacity = 1;
            });
          });
        };
        tmp.onerror = () => {
          imgElement.style.opacity = 1;
        };
      }, fadeDuration);
    } catch (err) {
      imgElement.src = newSrc;
      imgElement.style.opacity = 1;
    }
  }

  const storedTheme = localStorage.getItem('theme');
  const isInitialLight = storedTheme === 'light' || (!storedTheme && !prefersDarkScheme);
  document.body.classList.toggle('light-theme', isInitialLight);
  if (logo) {
    logo.style.opacity = logo.style.opacity || 1;
    logo.src = isInitialLight ? "assets/images/MK Lite.png" : "assets/images/MK.jpg";
  }
  if (profile) {
    profile.style.opacity = profile.style.opacity || 1;
    profile.src = isInitialLight ? "assets/images/Profile1.jpg" : "assets/images/Profile2.jpg";
  }

  if (logo) {
    logo.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      fadeSwapImage(logo, isLight ? "assets/images/MK Lite.png" : "assets/images/MK.jpg");
      fadeSwapImage(profile, isLight ? "assets/images/Profile1.jpg" : "assets/images/Profile2.jpg");
    });
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add('show');
    document.body.classList.add('menu-open', 'active');
  }
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('show');
    document.body.classList.remove('menu-open', 'active');
  }
  function toggleNav() {
    if (!nav) return;
    if (nav.classList.contains('show')) closeNav();
    else openNav();
  }

  if (hamburger) {
    hamburger.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      toggleNav();
    });
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
      }
    });
  }

  if (navLinks) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isSmallViewport()) {
          closeNav();
        }
      });
    });
  }

  function handleOutsidePointer(e) {
    if (!isSmallViewport()) return;
    if (!nav) return;
    if (!nav.classList.contains('show')) return;
    const target = e.target;
    if (nav.contains(target)) return;
    if (hamburger && hamburger.contains(target)) return;
    if (logo && logo.contains(target)) return;
    closeNav();
  }

  document.addEventListener('pointerdown', handleOutsidePointer, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (nav && nav.classList.contains('show')) closeNav();
    }
  });

  if (gridRows) {
    gridRows.forEach(row => {
      row.addEventListener('click', (ev) => {
        document.querySelectorAll('.grid-container .row').forEach(r => r.classList.remove('active'));
        row.classList.add('active');
        ev.stopPropagation();
      });
    });
  }

  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.grid-container .row')) {
      document.querySelectorAll('.grid-container .row').forEach(r => r.classList.remove('active'));
    }
  }, { passive: true });

  let lastIsSmall = isSmallViewport();
  window.addEventListener('resize', () => {
    const nowSmall = isSmallViewport();
    if (!nowSmall && lastIsSmall) {
      closeNav();
    }
    lastIsSmall = nowSmall;
  });
});
