document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // CLOSE MODALS (PUT THIS FIRST)
  // =========================
  const closeButtons = document.querySelectorAll(".close-modal");

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.close();
    });
  });

  // =========================
  // TIMESTAMP
  // =========================


var tsEl = document.getElementById("timestamp");
if (tsEl) tsEl.value = new Date().toISOString();

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");
if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

// =========================
// MODALS 
// =========================


var npBtn = document.getElementById("npBtn");
var npModal = document.getElementById("npModal");
if (npBtn && npModal) {
  npBtn.addEventListener("click", () => npModal.showModal());
}


var bronzeBtn = document.getElementById("bronzeBtn");
var bronzeModal = document.getElementById("bronzeModal");
if (bronzeBtn && bronzeModal) {
  bronzeBtn.addEventListener("click", () => bronzeModal.showModal());
}


var silverBtn = document.getElementById("silverBtn");
var silverModal = document.getElementById("silverModal");
if (silverBtn && silverModal) {
  silverBtn.addEventListener("click", () => silverModal.showModal());
}


var goldBtn = document.getElementById("goldBtn");
var goldModal = document.getElementById("goldModal");
if (goldBtn && goldModal) {
  goldBtn.addEventListener("click", () => goldModal.showModal());
}

