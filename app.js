const hamburger_menu = document.querySelector(".hamburger-menu");
const mobile_view = document.querySelector(".mobile-view");
const x_icon = document.querySelector(".x");
const moblie_view_navList = document.querySelectorAll(
  ".mobile-view_nav-list li"
);

// functions
const showMobileMenu = () => {
  mobile_view.className = "mobile-view show";
};
const hideMobileMenu = () => {
  mobile_view.className = "mobile-view";
};

//Event Listeners
hamburger_menu.addEventListener("click", showMobileMenu);
x_icon.addEventListener("click", hideMobileMenu);
moblie_view_navList.forEach((li) => {
  li.addEventListener("click", hideMobileMenu);
});
