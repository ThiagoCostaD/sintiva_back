const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const currentYear = document.querySelector('#current-year');
const form = document.querySelector('#quick-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const formMessage = document.querySelector('#form-message');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const clearValidation = () => {
  [nameInput, emailInput].forEach((field) => field?.classList.remove('invalid'));

  if (formMessage) {
    formMessage.textContent = '';
    formMessage.classList.remove('error');
  }
};

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearValidation();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let hasError = false;

    if (name.length < 2) {
      nameInput.classList.add('invalid');
      hasError = true;
    }

    if (!isValidEmail(email)) {
      emailInput.classList.add('invalid');
      hasError = true;
    }

    if (hasError) {
      formMessage.textContent = 'Revise seu nome e e-mail para continuar.';
      formMessage.classList.add('error');
      return;
    }

    const draft = {
      name,
      email,
      startedAt: new Date().toISOString()
    };

    localStorage.setItem('consistup-curriculo-draft', JSON.stringify(draft));

    formMessage.textContent = `Perfeito, ${name.split(' ')[0]}. Seu início de cadastro foi salvo neste navegador.`;
    form.reset();
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.13,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
