const navBtn = document.querySelector("#mobile-nav-btn");
const mobileNav = document.querySelector("#mobile-nav");
const btnIcon = document.querySelector("#mobile-nav-btnIcon");
const userProfileBtn = document.querySelector("#userMenu-btn");
const userProfileMenu = document.querySelector("#userMenu");

navBtn.addEventListener("click", () => {
  toggleMobileNav();
  if (!userProfileMenu.classList.contains("hidden")) {
    toggleUserProfileMenu()
    }
});

document.querySelector("main").addEventListener("click", () => {
  if (mobileNav.classList.contains("block")) {
    toggleMobileNav()
  }
  if (!userProfileMenu.classList.contains("hidden")) {
  toggleUserProfileMenu()
  }
});

userProfileBtn.addEventListener("click", () => {
  toggleUserProfileMenu()
  if (mobileNav.classList.contains("block")) {
    toggleMobileNav()
  }
});

function toggleMobileNav() {
  mobileNav.classList.toggle("hidden");
  mobileNav.classList.toggle("block");
  btnIcon.classList.toggle("fa-bars");
  btnIcon.classList.toggle("fa-x");
}

function toggleUserProfileMenu() {
  userProfileMenu.classList.toggle("hidden");
}