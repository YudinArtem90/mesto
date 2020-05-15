const objectForm = {
  form : '.popup__container',
  inputForm: '.popup__field'
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, spanError) => {
  element.classList.add('form__input_type_error');
  spanError.classList.add('popup__field-error_active');
  spanError.textContent = element.validationMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element, spanError) => {
  element.classList.remove('form__input_type_error');
  spanError.classList.remove('popup__field-error_active');
  spanError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formInput, form) => {
  const spanError = form.querySelector(`#${formInput.id}-error`);
  console.log('formInput.validity.valid', formInput.validity.valid);
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput, spanError);
  } else {
    // Если проходит, скроем
    hideInputError(formInput, spanError);
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
