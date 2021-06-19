const openMenuBtn = document.querySelector('#open-menu');
const closeMenuBtn = document.querySelector('#close-menu');
const mobileNav = document.querySelector('#mobile-nav');
const menu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelectorAll('.menu-overlay');

function openMenu(event) {
  event.preventDefault();
  /**
   * TODO
   * Set "menu" style
   * .mobile-menu { display: block }
   *
   * Set the style of each "menuOverlay" node
   * .menu-overlay {
   *    filter: blur(8px);
   * }
   */
}

function hideMenu() {
  /**
   * TODO
   * Set "menu" style
   * .mobile-menu { display: none; }
   *
   * Set the style of each "menuOverlay" node
   * .menu-overlay {
   *    filter: none;
   * }
   */
}

function onClickNav() {
  hideMenu();
}

function closeMenu(event) {
  event.preventDefault();
  hideMenu();
}

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
mobileNav.addEventListener('click', onClickNav);