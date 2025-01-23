import { initialCards } from './cards';
import '../pages/index.css';
import { createCard, createNewCard, cardLike } from './components/card';
import { openPopup, closePopup } from './components/modal';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const addForm = addPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');

function renderCards() {
  initialCards.forEach(({ name, link }) => {
    const card = createCard({ name, link });
    cardsContainer.append(card);
  });
}

renderCards();

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

document.addEventListener('click', (event) => {
  const targetElem = event.target;
  if (
    event.target.classList.contains('popup__close') ||
    (!targetElem.closest('.popup__content') && targetElem.closest('.popup'))
  ) {
    const popupElem = targetElem.closest('.popup_is-opened');
    closePopup(popupElem);
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.value;
  jobInput.value;
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closePopup(editPopup);
}

formElement.addEventListener('submit', handleFormSubmit);

addForm.addEventListener('submit', createNewCard);

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    cardLike(evt.target);
  }
});

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const card = evt.target.closest('.card');
    const cardImage = evt.target;
    const cardTitle = card.querySelector('.card__title');
    popupImage.src = cardImage.src;
    popupTitle.textContent = cardTitle.textContent;
    openPopup(imagePopup);
  }
});
