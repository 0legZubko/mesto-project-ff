import { addLike, removeLike } from './api';

export function createCard(
  cardData,
  deleteCard,
  likeCard,
  hendleImagePopup,
  userId
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;
  card.id = cardData['_id'];

  cardImage.addEventListener('click', () => hendleImagePopup(cardData));

  const deleteButton = card.querySelector('.card__delete-button');

  if (cardData.owner['_id'] === userId) {
    deleteButton.addEventListener('click', () => deleteCard(card.id));
  } else {
    deleteButton.style.display = 'none';
  }

  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const isLiked = cardData.likes.some((like) => like['_id'] === userId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeCounter.textContent = cardData.likes.length;
  likeButton.addEventListener('click', () => {
    likeCard(card.id, likeButton, likeCounter);
  });
  return card;
}

export function likeCard(cardId, button, counter) {
  const handleResponse = (data) => {
    button.classList.toggle('card__like-button_is-active');
    counter.textContent = data.likes.length;
  };
  const likeMethod = button.classList.contains('card__like-button_is-active')
    ? removeLike
    : addLike;

  likeMethod(cardId)
    .then(handleResponse)
    .catch((err) => console.log('Запрос не выполнен.', err));
}
