const pageElements = {
  form : '.popup__container',
  inputForm: '.popup__field',
  buttonSaveForm: '.popup__save-button',
  popupEditProfile : '#popupEditProfile',
  popupAddCard: '#popupAddCard',
  popupViewPhoto: '#popupViewPhoto',
  spanForm : '.popup__field-error'
}

const buttonDisabled = (buttonSave) => {
  buttonSave.classList.add('popup__save-button_blocking');
  buttonSave.disabled = true;
}

const buttonActivated = (buttonSave) => {
  buttonSave.classList.remove('popup__save-button_blocking');
  buttonSave.disabled = false;
}

const isButtonActive = (buttonSave) => {
    return !buttonSave.classList.contains('popup__save-button_blocking');
}


const showInputError = (spanError, element) => {
  element.classList.add('form__input_type_error');
  spanError.classList.add('popup__field-error_active');
  spanError.textContent = element.validationMessage;
};


const hideInputError = (spanError, element) => {
  element.classList.remove('form__input_type_error');
  spanError.classList.remove('popup__field-error_active');
  spanError.textContent = '';
};

const findSpanError = (form, formInput) => {
  return form.querySelector(`#${formInput.id}-error`);
}

const isFormInvalid = (formInputs) => {
  return Array.from(formInputs).some((input) => {
    return !input.validity.valid;
  });
}

const validInput = (formInput, spanError) => {
  formInput.validity.valid ?
    hideInputError(spanError, formInput) :
    showInputError(spanError, formInput);
}

const validForm = (formInputs, buttonSave) => {
  isFormInvalid(formInputs) ? 
    buttonDisabled(buttonSave) : 
    buttonActivated(buttonSave);
}


const validAll = (formInput, form, formInputs) => {
  const spanError = findSpanError(form, formInput);
  const buttonSave = form.querySelector(pageElements.buttonSaveForm);

  validInput(formInput, spanError);
  validForm(formInputs, buttonSave);
};

const preventDefaultForm = (form) => {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
}

const addEventListenerInputForm = (formInputs, form) => {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => validAll(input, form, formInputs));
  });
}

const enableValidation = (object) => {
  const forms = document.querySelectorAll(object.form);

  forms.forEach((form) => {
    const formInputs = form.querySelectorAll(object.inputForm);

    preventDefaultForm(form);
    
    addEventListenerInputForm(formInputs, form);
    
  });
}

enableValidation(pageElements);
