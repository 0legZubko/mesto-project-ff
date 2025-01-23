import { closePopup } from './modal';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const addPopup = document.querySelector('.popup_type_new-card');
const cardInputName = addPopup.querySelector('.popup__input_type_card-name');
const cardInputLink = addPopup.querySelector('.popup__input_type_url');

export function createCard({ name, link }, cardLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

export function createNewCard(evt) {
  evt.preventDefault();

  const newCardName = cardInputName.value;
  const newCardLink = cardInputLink.value;

  const newCardData = createCard(
    { name: newCardName, link: newCardLink },
    deleteCard
  );
  cardsContainer.prepend(newCardData);
  closePopup(addPopup);
  cardInputName.value = '';
  cardInputLink.value = '';
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function cardLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
