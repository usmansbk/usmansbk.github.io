const DATA = [
  {
    title: 'Tonic',
    image: 'images/snapshots/tonic.svg',
    captions: ['CANOPY', 'Back End Dev', '2015'],
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javaScript'],
  },
  {
    title: 'Multi-Post Stories',
    image: 'images/snapshots/stories.svg',
    captions: ['FACEBOOK', 'Full Stack Dev', '2015'],
    description: 'Experimental content creation feature that allows users to add to an existing story over the course of a day without spamming their friends.',
    tags: ['html', 'Ruby on rails', 'css', 'javaScript'],
  },
  {
    title: 'Facebook 360',
    image: 'images/snapshots/facebook.svg',
    captions: ['FACEBOOK', 'Full Stack Dev', '2015'],
    description: "Exploring the future of media in Facebook's first Virtual Reality app; a place to discover and enjoy 360 photos and videos on Gear VR.",
    tags: ['html', 'Ruby on rails', 'css', 'javaScript'],
  },
  {
    title: 'Uber Navigation',
    image: 'images/snapshots/uber.svg',
    captions: ['Uber', 'Lead Developer', '2018'],
    description: 'A smart assistant to make driving more safe, efficient, and fun by unlocking your most expensive computer: your car.',
    tags: ['html', 'Ruby on rails', 'css', 'javaScript'],
  },
];

const portfolio = document.querySelector('#portfolio');

function createCard(project) {

}

function loadProjects(data = []) {
  data.forEach((project) => {
    portfolio.appendChild(createCard(project));
  });
}

loadProjects(DATA);

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

// Throttle onscroll listener
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
