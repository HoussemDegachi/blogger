const navBtn = document.querySelector("#mobile-nav-btn");
const mobileNav = document.querySelector("#mobile-nav");
const btnIcon = document.querySelector("#mobile-nav-btnIcon");

navBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
  mobileNav.classList.toggle("block");
  btnIcon.classList.toggle("fa-bars");
  btnIcon.classList.toggle("fa-x");
});

document.querySelector("main").addEventListener("click", () => {
  if (mobileNav.classList.contains("block")) {
    mobileNav.classList.remove("block");
    mobileNav.classList.add("hidden");
    btnIcon.classList.remove("fa-x");
    btnIcon.classList.add("fa-bars");
  }
});
