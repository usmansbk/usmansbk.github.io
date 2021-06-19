const openMenuBtn = document.querySelector('#open-menu');
const closeMenuBtn = document.querySelector('#close-menu');
const menu = document.querySelector('.mobile-menu');
const mobileNav = document.querySelectorAll('.mobile-nav');
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
   * 	filter: blur(8px);
   * }
   */
}

function closeMenu(event) {
  event.preventDefault();
  /**
   * TODO
   * Set "menu" style
   * .mobile-menu { display: none; }
   *
   * Set the style of each "menuOverlay" node
   * .menu-overlay {
   * 	filter: none;
   * }
   */
}

function hideMenu() {
  /**
   * TODO
   * Set "menu" style
   * .mobile-menu { display: none; }
   */
}

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
mobileNav.addEventListener('click', hideMenu);
