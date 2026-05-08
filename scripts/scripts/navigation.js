const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});