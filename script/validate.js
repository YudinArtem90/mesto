import {pageElements} from './data.js';
// export const pageElements = {
//   form : '.popup__container',
//   inputForm: '.popup__field',
//   buttonSaveForm: '.popup__save-button',
//   popupEditProfile : '#popupEditProfile',
//   popupAddCard: '#popupAddCard',
//   popupViewPhoto: '#popupViewPhoto',
//   spanForm : '.popup__field-error'
// }

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

const findInputsForm = (form, objectPageElements) => {
  return form.querySelectorAll(objectPageElements.inputForm);
}

const isFormInvalid = (formInputs) => {
  return Array.from(formInputs).some((input) => {
    return !input.validity.valid;
  });
}

const validInput = (form, formInput) => {
  const spanError = findSpanError(form, formInput);

  formInput.validity.valid ?
    hideInputError(spanError, formInput) :
    showInputError(spanError, formInput);
}

const validForm = (form, formInputs, objectPageElements) => {
  const buttonSave = form.querySelector(objectPageElements.buttonSaveForm);

  isFormInvalid(formInputs) ? 
    buttonDisabled(buttonSave) : 
    buttonActivated(buttonSave);
}


const validAll = (form, formInputs, objectPageElements, input = 0) => {
    if(input){
      validInput(form, input);
    }else{
      formInputs.forEach((input) => {
        validInput(form, input);
      });
    }
    
    validForm(form, formInputs, objectPageElements);
};

const preventDefaultForm = (form) => {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
}

const addEventListenerInputForm = (formInputs, form, objectPageElements) => {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => validAll(form, formInputs, objectPageElements, input));
  });
}

const enableValidation = (objectPageElements) => {
  const forms = document.querySelectorAll(objectPageElements.form);

  forms.forEach((form) => {
    const formInputs = findInputsForm(form, objectPageElements); 

    preventDefaultForm(form);
    
    addEventListenerInputForm(formInputs, form, objectPageElements);
    
  });
}

enableValidation(pageElements);
