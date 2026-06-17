/* =====================================================================
   main.js — shared behavior for every page
   Handles: hamburger nav, footer year/last-modified
===================================================================== */

// ── Hamburger menu ──
const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// ── Footer: year + last modified ──
const yearEl = document.getElementById('year');
const modEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = 'Last Modified: ' + document.lastModified;
