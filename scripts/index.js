import * as dataFoto from "./dataFoto.js";
const sliderLine = document.querySelector(".popup__sliderLine");
const sliderBtnRight = document.querySelector(".popup__sliderBtn_right");
const sliderBtnLeft = document.querySelector(".popup__sliderBtn_left");
const sliderIndicators = document.querySelector(".popup__sliderIndicators");

let sliderCount = 0;
let sliderIndicatorActive;
let sliderWidth;
let sliderImages;

function nextSlide() {
  sliderIndicatorActive[sliderCount].classList.remove(
    "popup__sliderIndicator-active"
  );
  sliderCount++;
  if (sliderCount >= sliderImages.length) {
    sliderCount = 0;
  }
  sliderIndicatorActive[sliderCount].classList.add("popup__sliderIndicator-active");
  rollSlider(sliderWidth);
}
function prevSlider() {
  sliderIndicatorActive[sliderCount].classList.remove(
    "popup__sliderIndicator-active"
  );
  sliderCount--;
  if (sliderCount < 0) {
    sliderCount = sliderImages.length - 1;
  }
  sliderIndicatorActive[sliderCount].classList.add("popup__sliderIndicator-active");
  rollSlider(sliderWidth);
}

function rollSlider(sliderWidth) {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}
// Автоматическое пролистывание
// setInterval(()=> {nextSlide()}, 4000);

const page = document.body.childNodes;
const photoButton = document.querySelectorAll(".photo__button");
const popupImage = page[3];

photoButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log();
    openPopup(popupImage, e.target.name);
  });
});
//------------- Открытие Popup ------------
function openPopup(popup, name) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);

  sliderCount = 0;

  if (name === "one") {
    sliderLine.insertAdjacentHTML("afterbegin", dataFoto.one);
    sliderIndicators.insertAdjacentHTML("afterbegin", dataFoto.oneIndicator);
  }
  if (name === "two") {
    sliderLine.insertAdjacentHTML("afterbegin", dataFoto.two);
    sliderIndicators.insertAdjacentHTML("afterbegin", dataFoto.twoIndicator);
  }

  if (name === "three") {
    sliderLine.insertAdjacentHTML("afterbegin", dataFoto.three);
    sliderIndicators.insertAdjacentHTML("afterbegin", dataFoto.threeIndicator);
  }
  if (name === "four") {
    sliderLine.insertAdjacentHTML("afterbegin", dataFoto.four);
    sliderIndicators.insertAdjacentHTML("afterbegin", dataFoto.fourIndicator);
  }
  sliderIndicatorActive = document.querySelectorAll(".popup__sliderIndicator");
  sliderIndicatorActive[sliderCount].classList.add("popup__sliderIndicator-active");

  sliderImages = document.querySelectorAll(".popup__sliderImg");
  sliderWidth = popup.childNodes[1].offsetWidth;
  sliderBtnRight.addEventListener("click", nextSlide);
  sliderBtnLeft.addEventListener("click", prevSlider);
}
//------------- Закрытие Popup ------------
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  sliderBtnRight.removeEventListener("click", nextSlide);
  sliderBtnLeft.removeEventListener("click", prevSlider);
  rollSlider(0);
  sliderCount = 0;
  sliderLine.innerHTML = "";
  sliderIndicators.innerHTML = "";
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

popupImage.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(popupImage);
  }
  if (evt.target.classList.contains("popup-close-button")) {
    closePopup(popupImage);
  }
});
