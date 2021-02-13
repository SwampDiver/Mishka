// Меню

const navMain = document.querySelector('.main-nav'),
      navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--no-js');
navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// Модальное окно заказа

const modalTrigger = document.querySelectorAll('[data-modal]'),
  popup = document.querySelector('.modal'),
  popupBtn = popup.querySelector('[data-close]');

modalTrigger.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.toggle("modal--opened");
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  popup.classList.remove('modal--opened');
  document.body.style.overflow = '';
}

popupBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

popup.addEventListener('click', (evt) => {
  if (evt.target === popup) {
    closeModal();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape' && popup.classList.contains('modal--opened')) {
    closeModal();
  }
});

//Слайдер

const prev = document.querySelector('.reviews__button--back');
const next = document.querySelector('.reviews__button--forward');
const slides = document.querySelectorAll('.reviews__item');

let index = 0;

const activeSlide = n => {
  for (let slide of slides) {
    slide.classList.remove('reviews__item--active');
  }
  slides[n].classList.add('reviews__item--active');
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    activeSlide(index);
  } else {
    index++;
    activeSlide(index);
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    activeSlide(index);
  } else {
    index--;
    activeSlide(index);
  }
};

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);
