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

const openMenuBtn = document.querySelector('#open-menu');
const closeMenuBtn = document.querySelector('#close-menu');
const mobileNav = document.querySelector('#mobile-nav');
const appBar = document.querySelector('.app-bar');
const menu = document.querySelector('.mobile-menu');
const overlay = Array.from(document.querySelectorAll('header, .headline, .works, .about-container, .contact-me'));
const portfolio = document.querySelector('#portfolio');

/**
 * Create a HTML element. Set it's attributes and apppend it's children to
 * the newly created Node.
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

function createCardCaptions(data = []) {
  const captions = [];

  data.forEach((caption, index, arr) => {
    const captionComponent = createComponent('span', {
      className: `caption bolder-2 color-n${index === 0 ? '600' : '100'}`,
      textContent: caption,
    });
    captions.push(captionComponent);
    if (index !== arr.length - 1) {
      const separator = createComponent('img', {
        src: 'images/icons/dot.svg',
        alt: '',
      });
      captions.push(separator);
    }
  });

  const cardCaptions = createComponent('div', {
    className: 'captions',
    children: captions,
  });

  return cardCaptions;
}

function createCardTitle(title) {
  const cardTitle = createComponent('h2', {
    className: 'header-3 color-n800 mb-12',
    textContent: title,
  });
  return cardTitle;
}

function createCardDescription(text) {
  const cardText = createComponent('p', {
    className: 'body-3 color-n600 mb-12',
    textContent: text,
  });
  return cardText;
}

function createCardTags(data = []) {
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

function createCardImage(src, alt) {
  const cardImage = createComponent('img', {
    src,
    alt,
    className: 'snapshot',
  });
  return cardImage;
}

/**
 * Create and return a project card DOM Node,
 * to be inserted into the project section on the main page.
 */
function createCard(project, invert) {
  const image = createCardImage(project.image, 'Snapshot of the project');
  const title = createCardTitle(project.title);
  const captions = createCardCaptions(project.captions);
  const description = createCardDescription(project.description);
  const tags = createCardTags(project.tags);
  const button = createComponent('button', {
    type: 'button',
    className: 'button',
    textContent: 'See Project',
  });

  const modal = document.querySelector('.modal');
  function toggleModal() {
    modal.classList.toggle('show-modal');
    overlay.forEach((part) => part.classList.toggle('modal-overlay'));
  }

  button.addEventListener('click', toggleModal);

  const footer = createComponent('div', {
    className: 'action',
    children: [button],
  });

  const body = createComponent('div', {
    className: `card-body mt-12 + ${invert ? ' swap' : ''}`,
    children: [title, captions, description, tags, footer],
  });

  const card = createComponent('article', {
    children: [image, body],
    className: 'card',
  });

  return card;
}

/**
 * Update the projects section of the main page with dynamically created cards
 */
function loadProjects(data = []) {
  data.forEach((project, index) => {
    portfolio.appendChild(createCard(project, index % 2 === 1));
  });
}

loadProjects(Object.values(DATA));

function toggleMenu(event) {
  if (event) {
    event.preventDefault();
  }
  menu.classList.toggle('open-menu');
  // Toggle the background blur effect
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
