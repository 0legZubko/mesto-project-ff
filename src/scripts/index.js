import '../pages/index.css';
import { createCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getUserInfo,
  getCards,
  setProfileInfo,
  setAvatar,
  createPost,
  deletePost,
} from './components/api';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const addCardSubmitButton = addPopup.querySelector('.popup__button');
const profileSubmitButton = editPopup.querySelector('.popup__button');
const closeButtons = document.querySelectorAll('.popup__close');
const acceptPopup = document.querySelector('.popup__type_confirm');
const acceptForm = acceptPopup.querySelector('.popup__form');

const editForm = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const cardInputName = addPopup.querySelector('.popup__input_type_card-name');
const cardInputLink = addPopup.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');

const addForm = addPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');

const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_avatar');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

function renderCard(cardData) {
  const newCard = createCard(
    cardData,
    openAcceptPopup,
    likeCard,
    hendleImagePopup,
    userId
  );
  cardsContainer.append(newCard);
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    userId = userData['_id'];
    cards.reverse().forEach((card) => {
      renderCard(card);
    });
  })
  .catch((err) => {
    console.log('Запрос не выполнен.', err);
  });

function hendleImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTitle.textContent = cardData.name;
  openModal(imagePopup);
}

addButton.addEventListener('click', () => {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(addPopup);
});

function addCard(event) {
  event.preventDefault();
  showLoading(addCardSubmitButton);

  const newPlace = {
    name: cardInputName.value,
    link: cardInputLink.value,
  };

  createPost(newPlace.name, newPlace.link)
    .then((data) => {
      renderCard(data);
      closePopup(addPopup);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    })
    .finally(() => {
      hideLoading(addCardSubmitButton);
    });
}

addForm.addEventListener('submit', addCard);

editButton.addEventListener('click', () => {
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

function editProfile(event) {
  event.preventDefault();
  showLoading(profileSubmitButton);

  setProfileInfo(nameInput.value, jobInput.value)
    .then((data) => {
      titleProfile.textContent = data.name;
      descriptionProfile.textContent = data.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    })
    .finally(() => {
      hideLoading(profileSubmitButton);
    });

  editForm.reset();
}

editForm.addEventListener('submit', editProfile);

function openAcceptPopup(cardId) {
  acceptForm.id = cardId;
  openPopup(acceptPopup);
}

function deleteCard(event) {
  event.preventDefault();

  const cardId = acceptPopup.id;
  deletePost(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[id='${cardId}']`);
      cardElement.remove();
      closePopup(acceptPopup);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    });
}

profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

function editAvatar(event) {
  event.preventDefault();
  showLoading(avatarSubmitButton);

  setAvatar(avatarUrlInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    })
    .finally(() => {
      hideLoading(avatarSubmitButton);
    });
}

avatarForm.addEventListener('submit', editAvatar);

function showLoading(saveButton) {
  saveButton.textContent = 'Сохранение...';
  saveButton.setAttribute('disabled', 'true');
}

function hideLoading(saveButton) {
  saveButton.textContent = 'Сохранить';
  saveButton.removeAttribute('disabled');
}

closeButtons.forEach((btn) => {
  btn.addEventListener('click', handlePopupClose);
});

function handlePopupClose(event) {
  const targetElem = event.target;
  const popupElem = targetElem.closest('.popup_is-opened');
  closeModal(popupElem);
}

popups.forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (
      !event.target.closest('.popup__content') &&
      event.target.closest('.popup')
    ) {
      handlePopupClose(event);
    }
  });
});
