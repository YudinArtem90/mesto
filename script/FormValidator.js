import {buttonDisabled, buttonActivated} from './index.js';

export default class FormValidator{
    constructor(pageElements, validateForm){
        this._pageElements = pageElements;
        this._validateForm = validateForm;
    }

    enableValidation(inputsForm, input = 0){
        if(input){
            this._validInput(input);
          }else{
            inputsForm.forEach((inputForm) => {
                this._validInput(inputForm);
            });
          }
          
          this._validForm(inputsForm);
    }

    _findSpanError = (formInput) => {
        return this._validateForm.querySelector(`#${formInput.id}-error`);
    }

    _validInput = (formInput) => {
        const spanError = this._findSpanError(formInput);
      
        formInput.validity.valid ?
            this._hideInputError(spanError, formInput) :
            this._showInputError(spanError, formInput);
    }

    _showInputError = (spanError, element) => {
        element.classList.add('form__input_type_error');
        spanError.classList.add('popup__field-error_active');
        spanError.textContent = element.validationMessage;
    };
      
      
    _hideInputError = (spanError, element) => {
        element.classList.remove('form__input_type_error');
        spanError.classList.remove('popup__field-error_active');
        spanError.textContent = '';
    };

    _isFormInvalid = (formInputs) => {
        return Array.from(formInputs).some((input) => {
          return !input.validity.valid;
        });
    }

    _validForm = (formInputs) => {
        const buttonSave = this._validateForm.querySelector(this._pageElements.buttonSaveForm);
      
        this._isFormInvalid(formInputs) ? 
            buttonDisabled(buttonSave) : 
            buttonActivated(buttonSave);
    }
}