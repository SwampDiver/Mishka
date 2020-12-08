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


// const orderButton = document.querySelector('.weekly-offer__order');
// const popup = document.querySelector('.modal');

//   orderButton.addEventListener("click", function () {
//      popup.classList.add("modal--opened");
//   });



