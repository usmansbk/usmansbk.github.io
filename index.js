const DATA = [
  {
    title: 'Share.do',
    thumbnail: 'images/snapshots/share-do-thumb.png',
    image: 'images/snapshots/share-do.png',
    captions: ['Side Project', 'Full Stack Dev', '2020'],
    description: 'Share-do is a mobile app that allows you share your schedules with your team (Family, Friends, Classmates, etc)',
    tags: ['ReactNative', 'ExpressJs', 'Firebase', 'PostgreSQL', 'AWS DynamoDB', 'Typescript', 'GraphQL'],
    sourceCode: 'https://github.com/usmansbk/share-do-landing',
    liveLink: 'https://serene-mirzakhani-2aa3ef.netlify.app/',
  },
  {
    title: 'My Reads',
    thumbnail: 'images/snapshots/my-reads-thumb.png',
    image: 'images/snapshots/my-reads.png',
    captions: ['Udacity', 'Frontend', '2020'],
    description: 'My Reads is a bookshelf app that allows you to organize your books. It has an easily searchable database for you to find new books.',
    tags: ['React', 'Redux', 'REST'],
    sourceCode: 'https://github.com/usmansbk/reactnd-project-myreads-starter',
    liveLink: 'https://compassionate-clarke-059d4c.netlify.app/',
  },
  {
    title: 'Flappy Bird',
    thumbnail: 'images/snapshots/flappybird.png',
    image: 'images/snapshots/flappybird.png',
    captions: ['MintBean', 'Game Dev', '2021'],
    description: 'Flappy Bird is an arcade-style game in which you control the bird Faby, which moves persistently to the right.',
    tags: ['Phaser3', 'javaScript'],
    sourceCode: 'https://github.com/usmansbk/flappy-bird',
    liveLink: 'https://blissful-wiles-7bf90a.netlify.app/',
  },
];

const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const navLinks = document.getElementById('mobile-nav');
const modalContainer = document.getElementById('modal-container');
const portfolio = document.getElementById('portfolio');
const form = document.getElementById('contact-form');
const appBar = document.querySelector('.app-bar');
const menu = document.querySelector('.mobile-menu');
const container = document.querySelector('.container');
const helperText = document.getElementById('helper-text');

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

function Button({
  text, icon, type, href,
}) {
  let button;
  if (type === 'link') {
    button = createComponent('a', {
      className: 'link-button',
      href,
      innerText: text,
      children: [Icon(icon)],
    });
  } else if (type === 'icon-button') {
    button = createComponent('button', {
      type: 'button',
      className: 'icon-button',
      children: [Icon('cancel')],
    });
  } else {
    button = createComponent('button', {
      type: 'button',
      className: 'button',
      textContent: text,
    });
  }

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
        type: 'link',
        text: 'See live',
        icon: 'link',
        href: project.liveLink,
      }),
      Button({
        type: 'link',
        text: 'See Source',
        icon: 'github-blue',
        href: project.sourceCode,
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

  const CloseButton = Button({
    type: 'icon-button',
    icon: 'cancel',
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

  CloseButton.addEventListener('click', () => {
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
  const CardImage = Picture(project.thumbnail);
  const CardTitle = Title(project.title);
  const CardText = Paragraph(project.description);
  const ProjectCaptions = Captions(project.captions);
  const ProjectTags = Tags(project.tags);
  const CardButton = Button({ text: 'See Project' });

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

  CardButton.addEventListener('click', () => {
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

function toggleMenu() {
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

function validateForm(event) {
  const email = form.elements.user_email;
  const { value } = email;
  const expected = value.toLowerCase();
  if (value !== expected) {
    email.classList.add('error');
    helperText.innerText = `Email must be in lower case. Example: ${expected}`;
    event.preventDefault();
  } else {
    email.classList.remove('error');
  }
}

const STORE_KEY = 'formData';

/**
 * This function will save the user current input
 * in local storage.
 */
function persistFormData(event) {
  let currentData = {};
  const storedData = localStorage.getItem(STORE_KEY);

  if (storedData) {
    currentData = JSON.parse(storedData);
  }

  const { name, value } = event.target;
  currentData[name] = value;
  localStorage.setItem(STORE_KEY, JSON.stringify(currentData));
}

/**
 * This function will check for saved form data,
 * and populate the page contact form if found.
 */
function populateForm() {
  const dataString = localStorage.getItem(STORE_KEY);

  if (dataString) {
    const storedData = JSON.parse(dataString);
    Object.keys(storedData).forEach((key) => {
      form[key].value = storedData[key];
    });
  }
}

function resetForm() {
  localStorage.removeItem(STORE_KEY);
  const email = form.elements.user_email;
  email.classList.remove('error');
  helperText.innerText = '';
}

function onPageLoad() {
  loadProjects(DATA);
  populateForm();
}

form.addEventListener('reset', resetForm);
form.user_email.addEventListener('input', persistFormData);
form.user_name.addEventListener('input', persistFormData);
form.message.addEventListener('input', persistFormData);
form.addEventListener('submit', validateForm);
openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
navLinks.addEventListener('click', toggleMenu);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onPageLoad);