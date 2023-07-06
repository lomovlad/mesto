const profile = document.querySelector('.profile');
const popupList = document.querySelectorAll('.popup');
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
const popupEdit = document.querySelector('.popup-edit');
const btnClosePopupEdit = popupEdit.querySelector('.popup__close-btn');
// Форма редактирования
const formPopupEdit = popupEdit.querySelector('.popup__form');
const inputName = formPopupEdit.querySelector('.popup__input_user_name');
const inputJob = formPopupEdit.querySelector('.popup__input_user_job');
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

// Открытие попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  return popup;
};

// Закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  return popup;
};

// Установить значения инпутов из информации профиля
function setInputValue () {
  let event = new Event('input');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  inputName.dispatchEvent(event);
  inputJob.dispatchEvent(event);
};

// Очистка инпутов
function clearInputFormAdd () {
  formAddElement.reset();
};

// Изменение полей профиля из формы редактирования
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
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
    openPopup(popupShowImg);
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
    closePopup(popupAddCard);
};

// Закрытие попапа по Esc 
function closePopupByEsc (evt) {
  if (evt.key === "Escape") {
    [...popupList].forEach(function (popup) {
      closePopup(popup);
    });
  }
};

// Закрытие попапа по клике на оверлэй
function closePopupOverlay (evt) {
  const target = evt.target;
  if (target.classList.contains('popup')) {
    [...popupList].forEach(function (popup) {
      closePopup(popup);
    });
  }
};

document.addEventListener('click', closePopupOverlay);

document.addEventListener('keydown', closePopupByEsc);

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  setInputValue();
});

btnClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  clearInputFormAdd();
});

closePopupAddBtn.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePopupShowImg.addEventListener('click', () => {
  closePopup(popupShowImg);
});

formPopupEdit.addEventListener('submit', handleFormSubmit); 
formAddElement.addEventListener('submit', handleFormAddSubmit);
