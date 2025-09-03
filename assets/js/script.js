const isSmallViewport = () => window.matchMedia('(max-width: 950px)').matches;

const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

function openNav() {
  nav.classList.add('show');
  document.body.classList.add('menu-open', 'active');
}
function closeNav() {
  nav.classList.remove('show');
  document.body.classList.remove('menu-open', 'active');
}
function toggleNav() {
  if (nav.classList.contains('show')) closeNav();
  else openNav();
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleNav();
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (isSmallViewport()) closeNav();
  });
});

function handleOutsideClick(e) {
  if (!isSmallViewport() || !nav.classList.contains('show')) return;

  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeNav();
  }
}

document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick, { passive: true });

document.querySelectorAll('.grid-container .row').forEach(row => {
  row.addEventListener('click', () => {
    document.querySelectorAll('.grid-container .row').forEach(r => r.classList.remove('active'));
    row.classList.add('active');
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.grid-container .row')) {
    document.querySelectorAll('.grid-container .row').forEach(r => r.classList.remove('active'));
  }
});
