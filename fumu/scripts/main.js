// fumu-sports.js — Site Plan Page Scripts

// ── Hamburger Menu ──
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// ── Footer: Year & Last Modified ──
const yearEl = document.getElementById('year');
const modEl  = document.getElementById('lastModified');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl)  modEl.textContent  = 'Last modified: ' + document.lastModified;
