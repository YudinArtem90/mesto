const objectForm = {
  form : '.popup__container',
  inputForm: '.popup__field',
  buttonSaveForm: '.popup__save-button'
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, spanError, buttonSave) => {
  element.classList.add('form__input_type_error');
  spanError.classList.add('popup__field-error_active');
  buttonSave.classList.add('popup__save-button_blocking');
  buttonSave.disabled = true; 
  spanError.textContent = element.validationMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element, spanError, buttonSave) => {
  element.classList.remove('form__input_type_error');
  spanError.classList.remove('popup__field-error_active');
  buttonSave.classList.remove('popup__save-button_blocking');
  buttonSave.disabled = false; 
  spanError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formInput, form) => {
  const spanError = form.querySelector(`#${formInput.id}-error`);
  const buttonSave = form.querySelector(objectForm.buttonSaveForm);
  
  if (!formInput.validity.valid) {
    showInputError(formInput, spanError, buttonSave);
  } else {
    hideInputError(formInput, spanError, buttonSave);
  }
};

const enableValidation = (object) => {
  const forms = document.querySelectorAll(object.form);

  forms.forEach((form) => {
    const formInputs = form.querySelectorAll(object.inputForm);

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    formInputs.forEach((input) => {
      input.addEventListener('input', () => isValid(input, form));
    });
    
  });
}

enableValidation(objectForm);
