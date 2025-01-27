import { initialCards } from './cards';
import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');

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

function renderCards() {
  initialCards.forEach(({ name, link }) => {
    const card = createCard(
      { name, link },
      deleteCard,
      likeCard,
      hendleImagePopup
    );
    cardsContainer.append(card);
  });
}

renderCards();

editButton.addEventListener('click', () => {
  openModal(editPopup);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

addButton.addEventListener('click', () => {
  openModal(addPopup);
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

closeButtons.forEach((btn) => {
  btn.addEventListener('click', handlePopupClose);
});

function hendleImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupTitle.textContent = name;
  openModal(imagePopup);
}

function createNewCard(evt) {
  evt.preventDefault();

  const newCardName = cardInputName.value;
  const newCardLink = cardInputLink.value;

  const newCardData = createCard(
    { name: newCardName, link: newCardLink },
    deleteCard,
    likeCard,
    hendleImagePopup
  );
  cardsContainer.prepend(newCardData);
  closeModal(addPopup);
  cardInputName.value = '';
  cardInputLink.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closeModal(editPopup);
}

editForm.addEventListener('submit', handleFormSubmit);

addForm.addEventListener('submit', createNewCard);
