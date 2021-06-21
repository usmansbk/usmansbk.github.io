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
const modalContainer = document.getElementById('modal-container');
const portfolio = document.getElementById('portfolio');
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
  const row = [];

  data.forEach((text, index, arr) => {
    const caption = createComponent('span', {
      className: `caption bolder-2 color-n${index === 0 ? '600' : '100'}`,
      textContent: text,
    });
    row.push(caption);
    if (index !== arr.length - 1) {
      row.push(Icon('dot'));
    }
  });

  const captions = createComponent('div', {
    className: 'captions',
    children: row,
  });

  return captions;
}

function Title(text) {
  const title = createComponent('h2', {
    className: 'header-3 color-n800 mb-12',
    textContent: text,
  });
  return title;
}

function Paragraph(text) {
  const paragraph = createComponent('p', {
    className: 'body-3 color-n600 mb-12',
    textContent: text,
  });
  return paragraph;
}

function Tags(data = []) {
  const tags = createComponent('ul', {
    className: 'tags',
    children: data.map((tag) => createComponent('li', {
      className: 'tag',
      children: [createComponent('span', {
        className: 'small color-b400',
        textContent: tag,
      })],
    })),
  });

  return tags;
}

function Picture(src, className = 'snapshot') {
  const image = createComponent('img', {
    src,
    alt: 'Snapshot of project',
    className,
  });
  return image;
}

function Button({ text, icon, href }) {
  const button = createComponent('a', {
    className: 'link-button',
    href,
    children: [
      createComponent('span', {
        innerText: text,
      }),
      Icon(icon),
    ],
  });

  return button;
}

function toggleModal() {
  container.classList.toggle('modal-overlay');
  document.body.classList.toggle('scroll-off');
}

/**
 * Create Modal component for project details
 */
function createModal(project) {
  const ModalFooter = createComponent('div', {
    className: 'modal-footer',
    children: [
      Button({
        text: 'See live',
        icon: 'link',
        href: '#live-link',
      }),
      Button({
        text: 'See Source',
        icon: 'github-blue',
        href: '#source',
      }),
    ],
  });

  const Divider = createComponent('div', {
    className: 'divider',
  });

  const Right = createComponent('div', {
    className: 'modal-right-block',
    children: [Tags(project.tags), Divider, ModalFooter],
  });

  const Left = createComponent('div', {
    className: 'modal-left-block',
    children: [Paragraph(project.description)],
  });

  const ModalBodyContent = createComponent('div', {
    className: 'modal-blocks mt-12',
    children: [Left, Right],
  });

  const ModalBody = createComponent('div', {
    className: 'modal-body',
    children: [
      Captions(project.captions),
      Picture(project.image, 'modal-image'),
      ModalBodyContent,
    ],
  });

  const CloseButton = createComponent('a', {
    id: 'close-modal',
    className: 'icon-button',
    href: '#close-modal',
    children: [Icon('cancel')],
  });

  const ModalHeader = createComponent('div', {
    className: 'modal-header mb-12',
    children: [Title(project.title), CloseButton],
  });

  const ModalContent = createComponent('div', {
    className: 'modal-content bg-n0',
    children: [ModalHeader, ModalBody],
  });

  const Dialog = createComponent('div', {
    className: 'modal-dialog',
    children: [ModalContent],
  });

  const Modal = createComponent('div', {
    className: 'modal',
    children: [Dialog],
  });

  CloseButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleModal();
    modalContainer.removeChild(Modal);
  });

  return Modal;
}

/**
 * Create and return a project card DOM Node,
 * to be inserted into the project section on the main page.
 */
function createCard(project, invert) {
  const CardImage = Picture(project.image);
  const CardTitle = Title(project.title);
  const CardText = Paragraph(project.description);
  const ProjectCaptions = Captions(project.captions);
  const ProjectTags = Tags(project.tags);
  const CardButton = createComponent('button', {
    type: 'button',
    className: 'button',
    textContent: 'See Project',
  });

  const CardFooter = createComponent('div', {
    className: 'action',
    children: [CardButton],
  });

  const CardBody = createComponent('div', {
    className: `card-body mt-12 + ${invert ? ' swap' : ''}`,
    children: [CardTitle, ProjectCaptions, CardText, ProjectTags, CardFooter],
  });

  const Card = createComponent('article', {
    children: [CardImage, CardBody],
    className: 'card',
  });

  CardButton.addEventListener('click', (event) => {
    event.preventDefault();
    modalContainer.appendChild(createModal(project));
    toggleModal();
  });

  return Card;
}

/**
 * Add projects to HTML portfolio section
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
