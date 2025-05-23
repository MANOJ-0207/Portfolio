// Theme toggle
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const logo = document.getElementById("logoImg");
const profile = document.getElementById("profile-img");

// Function to smoothly fade and swap image
function fadeSwapImage(imgElement, newSrc) {
  imgElement.style.opacity = 0;

  // Wait for fade-out before changing src
  setTimeout(() => {
    imgElement.src = newSrc;

    // Fade in once image is loaded
    imgElement.onload = () => {
      imgElement.style.opacity = 1;
    };
  }, 200);
}

// Set initial theme
const storedTheme = localStorage.getItem('theme');
const isInitialLight = storedTheme === 'light' || (!storedTheme && !prefersDarkScheme);

document.body.classList.toggle('light-theme', isInitialLight);

logo.src = isInitialLight ? "assets/images/MK Lite.png" : "assets/images/MK.jpg";
profile.src = isInitialLight ? "assets/images/Profile1.jpg" : "assets/images/Profile2.jpg";

// On theme toggle
logo.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  fadeSwapImage(logo, isLight ? "assets/images/MK Lite.png" : "assets/images/MK.jpg");
  fadeSwapImage(profile, isLight ? "assets/images/Profile1.jpg" : "assets/images/Profile2.jpg");
});


// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('show');
  document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) { // Only execute for mobile
      nav.classList.remove('show');
      document.body.classList.remove('menu-open');
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target) &&
      nav.classList.contains('show')) {
    nav.classList.remove('show');
    document.body.classList.remove('menu-open');
  }
});

// On page load, add click handlers
document.querySelectorAll('.grid-container .row').forEach(row => {
  row.addEventListener('click', () => {
    // Remove active from all rows
    document.querySelectorAll('.grid-container .row').forEach(r => r.classList.remove('active'));
    // Add active to clicked row
    row.classList.add('active');
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.grid-container .row')) {
    document.querySelectorAll('.grid-container .row').forEach(r => r.classList.remove('active'));
  }
});
