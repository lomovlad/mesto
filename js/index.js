const profile = document.querySelector('.profile');
// Кнопки
const editButton = profile.querySelector('.profile__edit-button');
// Поля профиля
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');
// Попап
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__close-btn');
// Форма
const formElement = popup.querySelector('.popup__form');
const inputName = formElement.querySelector('.popup__input_user_name');
const inputJob = formElement.querySelector('.popup__input_user_job');

function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 




