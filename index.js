const DATA = {
  Tonic: {
    title: 'Tonic',
    image: 'images/snapshots/tonic.svg',
    captions: ['CANOPY', 'Back End Dev', '2015'],
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javaScript'],
  },
  'Multi-Post Stories': {
    title: 'Multi-Post Stories',
    image: 'images/snapshots/stories.svg',
    captions: ['FACEBOOK', 'Full Stack Dev', '2015'],
    description: 'Experimental content creation feature that allows users to add to an existing story over the course of a day without spamming their friends.',
    tags: ['html', 'Ruby on rails', 'css', 'javaScript'],
  },
  'Facebook 360': {
    title: 'Facebook 360',
    image: 'images/snapshots/facebook.svg',
    captions: ['FACEBOOK', 'Full Stack Dev', '2015'],
    description: "Exploring the future of media in Facebook's first Virtual Reality app; a place to discover and enjoy 360 photos and videos on Gear VR.",
    tags: ['html', 'Ruby on rails', 'css', 'javaScript'],
  },
  'Uber Navigation': {
    title: 'Uber Navigation',
    image: 'images/snapshots/uber.svg',
    captions: ['Uber', 'Lead Developer', '2018'],
    description: 'A smart assistant to make driving more safe, efficient, and fun by unlocking your most expensive computer: your car.',
    tags: ['html', 'Ruby on rails', 'css', 'javaScript'],
  },
};

const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const navLinks = document.getElementById('mobile-nav');
const appBar = document.querySelector('.app-bar');
const menu = document.querySelector('.mobile-menu');
const container = document.querySelector('.container');

/**
 * Helper function for creating HTML DOM elements
 */
function createComponent(name, props = {}) {
  const { children = [], ...attributes } = props;
  const element = document.createElement(name);
  Object.keys(attributes).forEach((attribute) => {
    element[attribute] = attributes[attribute];
  });
  children.forEach((child) => element.appendChild(child));

  return element;
}

function Icon(name) {
  const icon = createComponent('img', {
    src: `images/icons/${name}.svg`,
    alt: '',
  });

  return icon;
}

function Captions(data = []) {
  const captions = [];

  data.forEach((caption, index, arr) => {
    const captionComponent = createComponent('span', {
      className: `caption bolder-2 color-n${index === 0 ? '600' : '100'}`,
      textContent: caption,
    });
    captions.push(captionComponent);
    if (index !== arr.length - 1) {
      captions.push(Icon('dot'));
    }
  });

  const cardCaptions = createComponent('div', {
    className: 'captions',
    children: captions,
  });

  return cardCaptions;
}

function Title(title) {
  const cardTitle = createComponent('h2', {
    className: 'header-3 color-n800 mb-12',
    textContent: title,
  });
  return cardTitle;
}

function Paragraph(text) {
  const cardText = createComponent('p', {
    className: 'body-3 color-n600 mb-12',
    textContent: text,
  });
  return cardText;
}

function Tags(data = []) {
  const cardTags = createComponent('ul', {
    className: 'tags',
    children: data.map((tag) => createComponent('li', {
      className: 'tag',
      children: [createComponent('span', {
        className: 'small color-b400',
        textContent: tag,
      })],
    })),
  });

  return cardTags;
}

function Picture(src, className = 'snapshot') {
  const cardImage = createComponent('img', {
    src,
    alt: 'Snapshot of project',
    className,
  });
  return cardImage;
}

function toggleMenu(event) {
  if (event) {
    event.preventDefault();
  }
  menu.classList.toggle('open-menu');
  container.classList.toggle('menu-overlay');
  document.body.classList.toggle('scroll-off');
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
navLinks.addEventListener('click', () => toggleMenu());
window.addEventListener('scroll', onScroll, { passive: true });
