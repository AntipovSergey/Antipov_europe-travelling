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
    form.reset();
  } else {
    form.reset();
  }
})

//Переключение карточек стран
const countryCards = document.querySelectorAll('.sites__link')
const countrySiteCards = document.querySelectorAll('.sites__card-link')
const countryLinks = document.querySelectorAll('.country__link');
const countryArticles = document.querySelectorAll('.country__article');

countryArticles.forEach((article) => {
  article.classList.add('country__article--hidden');
});
countryLinks[0].classList.add('country__item--selected');
countryArticles[0].classList.remove('country__article--hidden');

const changeArticles = (index) => {
  countryLinks.forEach((button) => {
    button.classList.remove('country__item--selected');
  });
  countryArticles.forEach((article) => {
    article.classList.add('country__article--hidden');
  });

  countryLinks[index].classList.add('country__item--selected');
  countryArticles[index].classList.remove('country__article--hidden');
};

countryLinks.forEach((element, index) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    changeArticles(index);
  });
});

countryCards.forEach((element, index) => {
  element.addEventListener('click', () => {
  changeArticles(index);
  });
});

countrySiteCards.forEach((element, index) => {
  element.addEventListener('click', () => {
  changeArticles(index);
  });
});

//Скролл меню country__list (библиотека Dragscroll)

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
      factory(exports);
  } else {
      factory((root.dragscroll = {}));
  }
}(this, function (exports) {
  let _window = window;
  let _document = document;
  let mousemove = 'mousemove';
  let mouseup = 'mouseup';
  let mousedown = 'mousedown';
  let EventListener = 'EventListener';
  let addEventListener = 'add'+EventListener;
  let removeEventListener = 'remove'+EventListener;
  let newScrollX;

  let dragged = [];
  let reset = function(i, el) {
      for (i = 0; i < dragged.length;) {
          el = dragged[i++];
          el = el.container || el;
          el[removeEventListener](mousedown, el.md, 0);
          _window[removeEventListener](mouseup, el.mu, 0);
          _window[removeEventListener](mousemove, el.mm, 0);
      }

      // cloning into array since HTMLCollection is updated dynamically
      dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
      for (i = 0; i < dragged.length;) {
          (function(el, lastClientX, lastClientY, pushed, scroller, cont){
              (cont = el.container || el)[addEventListener](
                  mousedown,
                  cont.md = function(e) {
                      if (!el.hasAttribute('nochilddrag') ||
                          _document.elementFromPoint(
                              e.pageX, e.pageY
                          ) == cont
                      ) {
                          pushed = 1;
                          lastClientX = e.clientX;
                          lastClientY = e.clientY;

                          e.preventDefault();
                      }
                  }, 0
              );

              _window[addEventListener](
                  mouseup, cont.mu = function() {pushed = 0;}, 0
              );

              _window[addEventListener](
                  mousemove,
                  cont.mm = function(e) {
                      if (pushed) {
                          (scroller = el.scroller||el).scrollLeft -=
                              newScrollX = (- lastClientX + (lastClientX=e.clientX));
                          if (el == _document.body) {
                              (scroller = _document.documentElement).scrollLeft -= newScrollX;
                          }
                      }
                  }, 0
              );
          })(dragged[i++]);
      }
  }


  if (_document.readyState == 'complete') {
      reset();
  } else {
      _window[addEventListener]('load', reset, 0);
  }

  exports.reset = reset;
}));
