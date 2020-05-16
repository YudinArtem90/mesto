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

// Функция, которая добавляет класс с ошибкой
const showInputError = (spanError, element) => {
  element.classList.add('form__input_type_error');
  spanError.classList.add('popup__field-error_active');
  spanError.textContent = element.validationMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (spanError, element) => {
  element.classList.remove('form__input_type_error');
  spanError.classList.remove('popup__field-error_active');
  spanError.textContent = '';
};

const findSpanError = (form, formInput) => {
  return form.querySelector(`#${formInput.id}-error`);
}

const isFormValid = (form, formInputs) => {
  const spanForm = form.querySelectorAll(pageElements.spanForm);
  let result = true;

  for(let i = 0; i < formInputs.length; i++){
    const input = formInputs[i];
    const isInputValid = input.validity.valid;
    
    if(!isInputValid){
      result = false;
      break;
    }
  }

  if(result){
    for(let i = 0; i < spanForm.length; i++){
      const span = spanForm[i];
      const isSpanError = span.classList.contains('popup__field-error_active');
      
      if(isSpanError){
        result = false;
        break;
      }
    }
  }

  return result;
}

// Функция, которая проверяет валидность
const isValid = (formInput, form, formInputs) => {
  const spanError = findSpanError(form, formInput);
  const buttonSave = form.querySelector(pageElements.buttonSaveForm);

  formInput.validity.valid ?
      hideInputError(spanError, formInput) :
      showInputError(spanError, formInput);

  isFormValid(form, formInputs) ? 
      buttonActivated(buttonSave) : 
      buttonDisabled(buttonSave);
};

const preventDefaultForm = (form) => {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
}

const addEventListenerInputForm = (formInputs, form) => {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => isValid(input, form, formInputs));
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
