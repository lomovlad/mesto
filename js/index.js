const profile = document.querySelector('.profile');
// Кнопки
const editButton = profile.querySelector('.profile__edit-button');
// Поля профиля
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__description');
// Попап
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__close-btn');
// Форма
let formElement = popup.querySelector('.popup__container');
let inputName = formElement.querySelector('.popup__name');
let inputJob = formElement.querySelector('.popup__job');


editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

function closePopup () {
  popup.classList.remove('popup_opened');
}

closePopupBtn.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 




