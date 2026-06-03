document.getElementById("timestamp").value = new Date().toISOString();

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// =========================
// MODALS (ADD THIS PART)
// =========================

// NP
document.getElementById("npBtn").addEventListener("click", () => {
  document.getElementById("npModal").showModal();
});

// Bronze
document.getElementById("bronzeBtn").addEventListener("click", () => {
  document.getElementById("bronzeModal").showModal();
});

// Silver
document.getElementById("silverBtn").addEventListener("click", () => {
  document.getElementById("silverModal").showModal();
});

// Gold
document.getElementById("goldBtn").addEventListener("click", () => {
  document.getElementById("goldModal").showModal();
});

