alert("Hello, Friendly advice. Plagiarism takes us nowhere. You should endeavor to do the work yourself. If you can't build a simple portfolio yourself, then you're not ready to be a developer. It gets more difficult later. Then you'll realize you've wasted your time.");

const openMenuBtn = document.querySelector('#open-menu');
const closeMenuBtn = document.querySelector('#close-menu');
const mobileNav = document.querySelector('#mobile-nav');
const appBar = document.querySelector('.app-bar');
const menu = document.querySelector('.mobile-menu');
const overlay = Array.from(document.querySelectorAll('header, .headline, .works, .about-container, .contact-me'));
function toggleMenu(event) {
  if (event) {
    event.preventDefault();
  }
  menu.classList.toggle('open-menu');
  overlay.forEach((part) => part.classList.toggle('menu-overlay'));
}

function onClickNavLink() {
  toggleMenu();
}

let scrolling = false;
function onScroll() {
  scrolling = true;
}

setInterval(() => {
  if (scrolling) {
    scrolling = false;
    const scrollY = Math.round(window.scrollY);
    if (scrollY) {
      appBar.classList.add('elevate-header');
    } else {
      appBar.classList.remove('elevate-header');
    }
  }
}, 300);

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
mobileNav.addEventListener('click', onClickNavLink);
window.addEventListener('scroll', onScroll, { passive: true });
