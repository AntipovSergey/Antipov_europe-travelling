// import IMask from 'imask';

//Реализация открытия/закрытия меню в шапке и no-js

const mainNav = document.querySelector('.main-header__nav');
const menuBtn = document.querySelector('.main-header__burger');
const menuClose = document.querySelector('.main-header__close');
const menu = document.querySelector('.main-header__site-navigation');

mainNav.classList.remove('main-header__nav--nojs');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('is-open');
});

menuClose.addEventListener('click', () => {
  menu.classList.toggle('is-open');
});

//Плавный скрол якорных ссылок

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
  e.preventDefault()

  const blockID = anchor.getAttribute('href').substr(1)

  document.getElementById(blockID).scrollIntoView({
  behavior: 'smooth',
  block: 'start'
  })
  })
}

//Закрытие меню при нажатии на ссылку в планшетной и мобильной версиях
const links = document.querySelectorAll('.main-header__link');

for (let link of links) {
  link.addEventListener ('click', () => {
    menu.classList.remove('is-open');
  })
}

//Появление модального окна popup и popup-success

const popupForm = document.querySelector('.popup__form');
const form = document.querySelector('.form__form');
const countryButton = document.querySelector('.article__button');
const priceButtons = document.querySelectorAll('.rate__button');
const popup = document.querySelector('.popup');
const popupSuccess = document.querySelector('.popup-success');
const popupClose = document.querySelector('.popup__close');
const popupSuccessClose = document.querySelector('.popup-success__close');
const overlay = document.querySelector('.overlay');
const buttonForm = document.querySelector('.form__button');

const closePopup = () => {
  overlay.classList.remove('overlay--shown');
  popup.classList.remove('popup--shown');
};

const closePopupSuccess = () => {
  popupSuccess.classList.add('popup-success--hidden');
};


for (let button of priceButtons) {
  button.addEventListener('click', () => {
    overlay.classList.add('overlay--shown');
    popup.classList.remove('popup--hidden');
  })
}

countryButton.addEventListener('click', () => {
  overlay.classList.add('overlay--shown');
  popup.classList.remove('popup--hidden');
})

popupClose.addEventListener('click', () => {
  closePopup();
  popupForm.reset();
})

popupSuccessClose.addEventListener('click', () => {
  closePopupSuccess();
  closePopup();
  popupForm.reset();
})

document.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27) {
    closePopup();
    closePopupSuccess();
    popupForm.reset();
    form.reset();
  }
})

overlay.addEventListener('click', (evt) => {
  if (evt.target === overlay) {
    evt.preventDefault();
    closePopup();
    closePopupSuccess();
    popupForm.reset();
    form.reset();
  }
});

//Set focus

const element = document.getElementById('popup-tel');
countryButton.addEventListener('click', () => {
  element.focus();
});

for (let button of priceButtons) {
  button.addEventListener('click', () => {
    element.focus();
  })
}

//Local storage

window.addEventListener('DOMContentLoaded', function(){
  const popupTel = document.getElementById('popup-tel');
  const popupMail = document.getElementById('popup-email');
  const button = document.querySelector('.popup__button')
  button.addEventListener('click', function(){
      localStorage.setItem('tel', popupTel.value);
      localStorage.setItem('mail', popupMail.value);
  })
})

//Отправка формы popup и form

const buttonPopup = document.querySelector('.popup__button');

const showPopupSuccess = () => {
  popupSuccess.classList.remove('popup-success--hidden');
};

buttonPopup.addEventListener('click', (evt) => {
  if (document.getElementById('popup-tel').value >= 10) {
    evt.preventDefault();
    showPopupSuccess();
  }
})

buttonForm.addEventListener('click', (evt) => {
  if (document.getElementById('form-tel').value >= 10) {
    evt.preventDefault();
    overlay.classList.add('overlay--shown');
    showPopupSuccess();
  } else {
    form.reset();
  }
})
