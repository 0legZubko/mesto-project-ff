export function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElem) => {
    setEventListener(formElem, options);
  });
}

export function clearValidation(formElem, options) {
  const inputList = Array.from(
    formElem.querySelectorAll(options.inputSelector)
  );
  const buttonElem = formElem.querySelector(options.submitButtonSelector);
  inputList.forEach((inputElem) => {
    hideInputError(formElem, inputElem, options);
  });
  toggleButtonState(inputList, buttonElem, options);
}

function showInputError(formElem, inputElem, errorMessage, options) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.add(options.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(options.errorClass);
}

function hideInputError(formElem, inputElem, options) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(options.inputErrorClass);
  errorElem.textContent = '';
  errorElem.classList.remove(options.errorClass);
}

function checkInputValidity(formElem, inputElem, options) {
  if (inputElem.validity.patternMismatch) {
    inputElem.setCustomValidity(inputElem.dataset.errorMessage);
  } else {
    inputElem.setCustomValidity('');
  }

  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validitationMessage, options);
  } else {
    hideInputError(formElem, inputElem, options);
  }
}

function setEventListener(formElem, options) {
  const inputList = Array.from(
    formElem.querySelectorAll(options.inputSelector)
  );

  const buttonElem = formElem.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElem, options);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      checkInputValidity(formElem, inputElem, options);
      toggleButtonState(inputList, buttonElem, options);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElem, options) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(options.inactiveButtonClass);
  } else {
    buttonElem.classList.remove(options.inactiveButtonClass);
  }
}
