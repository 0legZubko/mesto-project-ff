import { hendleImagePopup } from '..';

export function createCard({ name, link }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

  cardImage.addEventListener('click', () => hendleImagePopup(link, name));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
