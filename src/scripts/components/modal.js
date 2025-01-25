export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyClosing);
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyClosing);
}

function keyClosing(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
