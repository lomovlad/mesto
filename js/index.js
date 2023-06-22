const profile = document.querySelector('.profile');
// Кнопки
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
// Поля профиля
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');
// Карточки
const templateElement = document.querySelector('#card-element').content.querySelector('.element');
const cardList = document.querySelector('.elements__list');
// Попап редактирования
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__close-btn');
// Форма редактирования
const formElement = popup.querySelector('.popup__form');
const inputName = formElement.querySelector('.popup__input_user_name');
const inputJob = formElement.querySelector('.popup__input_user_job');
// Попап добавления карточек
const popupAddCard = document.querySelector('.popup-add');
const closePopupAddBtn = popupAddCard.querySelector('.popup__close-btn');
// Форма редактирования
const formAddElement = popupAddCard.querySelector('.popup__form');
const inputNameAdd = formAddElement.querySelector('.popup__input_user_name');
const inputUrlAdd = formAddElement.querySelector('.popup__input_user_job');
// Попап просмотра фото
const popupShowImg = document.querySelector('.popup-img');
const closePopupShowImg = popupShowImg.querySelector('.popup__close-btn');
const popupShowImgPic = popupShowImg.querySelector('.popup__img-increased');
const popupShowImgName = popupShowImg.querySelector('.popup-img__name');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открыть попап редактирования и передача значений со страницы
function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

// Закрытие попапа редактирования
function closePopup () {
  popup.classList.remove('popup_opened');
};

// Открытие попапа добавления карточек
function openPopupAdd () {
  popupAddCard.classList.add('popup_opened');
  formAddElement.reset();
};

// Закрытие попапа добавления карточек
function closePopupAdd () {
  popupAddCard.classList.remove('popup_opened');
};

// Открытие попапа просмотра изображений
function openPopupImg () {
  popupShowImg.classList.add('popup_opened');
};

// Закрытие попапа просмотра изображений
function closePopupImg () {
  popupShowImg.classList.remove('popup_opened');
};

// Изменение полей профиля из формы редактирования
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
};

// Создание и наполнение карточек 
function createCard ({name, link}) {
  const cardElement = templateElement.cloneNode(true);
  const nameCard = cardElement.querySelector('.element__caption');
  const imageCard = cardElement.querySelector('.element__photo');
  const buttonLikeCard = cardElement.querySelector('.element__like');
  const buttonDelCard = cardElement.querySelector('.element__delete');
  nameCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;

  // Удаление карточки
  buttonDelCard.addEventListener('click', () => {
    cardElement.remove();
  });

  // Лайк карточки
  buttonLikeCard.addEventListener('click', () => {
    buttonLikeCard.classList.toggle('element__like_active');
  });

  // Открыть попап просмотра изображения
  imageCard.addEventListener('click', () => {
    openPopupImg();
    popupShowImgName.textContent = name;
    popupShowImgPic.src = link;
    popupShowImgPic.alt = name;
  });

  return cardElement;
};

// Рендер карточек по умолчанию по append
function renderCard (data, container, position = 'append') {
  const renderNewElement = createCard(data);
  switch (position) {
    case 'append':
      container.append(renderNewElement);
      break;
    case 'prepend':
      container.prepend(renderNewElement);
      break;
    default:
      break;
  };
};

// Рендер дефолтных карточек из массива
initialCards.forEach((item) => {
  renderCard(item, cardList);
});

// Создание и добавление карточек в разметку из формы
function handleFormAddSubmit (evt) {
    evt.preventDefault();
    const dataCard = {
      name: inputNameAdd.value, 
      link: inputUrlAdd.value,
    };
    renderCard(dataCard, cardList, 'prepend');
    closePopupAdd();
};

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupAdd);
closePopupBtn.addEventListener('click', closePopup);
closePopupAddBtn.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', handleFormSubmit); 
formAddElement.addEventListener('submit', handleFormAddSubmit);
closePopupShowImg.addEventListener('click', closePopupImg);
