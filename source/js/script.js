//Реализация открытия/закрытия меню в шапке и no-js

const mainNav = document.querySelector('.main-header__nav');
const menuBtn = document.querySelector('.main-header__burger');
const menuClose = document.querySelector('.main-header__close');
const menu = document.querySelector('.main-header__site-navigation');

console.log(mainNav)
mainNav.classList.remove('main-header__nav--nojs');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('is-open');
});

menuClose.addEventListener('click', () => {
  menu.classList.toggle('is-open');
});
