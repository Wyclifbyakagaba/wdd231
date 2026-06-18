// ===============================
// HAMBURGER MENU
// ===============================
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');

    const isOpen = navMenu.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// =======================================
// FOOTER
//================================
const yearEl = document.getElementById('year');
const modEl  = document.getElementById('lastModified');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
if (modified) {
     modified.textcontent = 'Last modified: ${document.lastModified}';
}


// =========================
// LOCAL STORAGE
// =========================

const visitMsg = document.getElementById("visit-msg");

if (visitMsg) {
    const lastVisit = localStorage.getItem("lastVisit");
    const today = Date.now();

    if (!lastVisit) {
        visitMsg.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const days =
            Math.floor((today - Number(lastVisit)) / 86400000);

        visitMsg.textContent =
            `Welcome back! It has been ${days} day(s) since your last visit.`;
    }

    localStorage.setItem("lastVisit", today);

