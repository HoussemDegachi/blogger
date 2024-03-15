const dropdownBtn = document.querySelector("#dropdown-btn");
const dropdownMenu = document.querySelector("#dropdown");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
  dropdownBtn.classList.toggle("rotate-90");
});
