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
  }
};

const menu = document.querySelector('.mobile-menu');
const overlay = Array.from(document.querySelectorAll('header, .headline, .works, .about-container, .contact-me'));
const portfolio = document.querySelector('#portfolio');
const mountModal = document.querySelector('#mount-modal');

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

function toggleModal() {
  overlay.forEach((part) => part.classList.toggle('modal-overlay'));
  bodyTag.classList.toggle('off-scroll');
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

/**
 * Create Modal component for project details
 */
function createModal(project) {
  const footer = createComponent('div', {
    className: 'modal-footer',
    children: [
      Button({
        text: 'See live',
        icon: 'live-link',
        href: '#live-link',
      }),
      Button({
        text: 'See Source',
        icon: 'github-blue',
        href: '#source',
      }),
    ],
  });

  const divider = createComponent('div', {
    className: 'divider',
  });

  const right = createComponent('div', {
    className: 'modal-right-block',
    children: [Tags(project.tags), divider, footer],
  });

  const left = createComponent('div', {
    className: 'modal-left-block',
    children: [Paragraph(project.description)],
  });

  const bodyContent = createComponent('div', {
    className: 'modal-blocks mt-12',
    children: [left, right],
  });

  const body = createComponent('div', {
    className: 'modal-body',
    children: [
      Captions(project.captions),
      Picture(project.image, 'modal-image'),
      bodyContent,
    ],
  });

  const closeButton = createComponent('a', {
    id: 'close-modal',
    className: 'icon-button',
    href: '#close-modal',
    children: [Icon('cancel')],
  });

  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleModal();
    const modal = document.querySelector('.modal');
    mountModal.removeChild(modal);
  });

  const header = createComponent('div', {
    className: 'modal-header mb-12',
    children: [Title(project.title), closeButton],
  });

  const content = createComponent('div', {
    className: 'modal-content bg-n0',
    children: [header, body],
  });

  const dialog = createComponent('div', {
    className: 'modal-dialog',
    children: [content],
  });

  const modal = createComponent('div', {
    className: 'modal',
    children: [dialog],
  });

  return modal;
}

/**
 * Create and return a project card DOM Node,
 * to be inserted into the project section on the main page.
 */
function createCard(project, invert) {
  const image = Picture(project.image);
  const title = Title(project.title);
  const captions = Captions(project.captions);
  const description = Paragraph(project.description);
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
  // Turn off background scrolling
  bodyTag.classList.toggle('off-scroll');

  menu.classList.toggle('open-menu');
}

function onClickNavLink() {
  toggleMenu();
}

let scrolling = true;
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
