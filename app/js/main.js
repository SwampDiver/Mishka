// Меню

const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');



navMain.classList.remove('main-nav--no-js');
navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


// Модальное окно заказа


const btnOrder = document.querySelector(`.weekly-offer__order`);
const btnOrders = document.querySelectorAll(`.catalog-item__icon`);
const popup = document.querySelector(`.modal`);
const overlay = document.querySelector(`.modal__overlay`);
const popupBtn = document.querySelector(`.modal__button`);

const openPopup = function () {
    popup.classList.add(`modal--opened`);
}

const closePopup = function () {
    popup.classList.remove(`modal--opened`);
}

function orderHandler() {
  openPopup();

  overlay.addEventListener(`click`, closePopup);

  window.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains(`modal--opened`)) {
        closePopup();
      }
    }
  });
}

if (btnOrder) {
  btnOrder.addEventListener(`click`, orderHandler);
} else {
  for (let i = 0; i < btnOrders.length; i++) {
    btnOrders[i].addEventListener(`click`, orderHandler);
  }
}

popupBtn.addEventListener(`click`, function(evt) {
  evt.preventDefault();
  closePopup();
});

