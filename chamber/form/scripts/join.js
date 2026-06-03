document.getElementById("timestamp").value = new Date().toISOString();

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// =========================
// MODALS 
// =========================


document.getElementById("npBtn").addEventListener("click", () => {
  document.getElementById("npModal").showModal();
});


document.getElementById("bronzeBtn").addEventListener("click", () => {
  document.getElementById("bronzeModal").showModal();
});


document.getElementById("silverBtn").addEventListener("click", () => {
  document.getElementById("silverModal").showModal();
});


document.getElementById("goldBtn").addEventListener("click", () => {
  document.getElementById("goldModal").showModal();
});

