import {buttonDisabled, buttonActivated, findInputsForm} from './index.js';

export default class FormValidator{
    constructor(pageElements, validateForm = 0){
        this._pageElements = pageElements;
        this._validateForm = validateForm;
    }


    enableValidation(){
        if(this._validateForm){
            const inputsForm = findInputsForm(this._validateForm, this._pageElements); 
            this._validationInputAndForm(inputsForm, this._validateForm);
        }else{
            this._addEventListenerForm();
        }
    }


    _addEventListenerForm(){
        const forms = document.querySelectorAll(this._pageElements.form);

        forms.forEach((form) => {
            const inputsForm = findInputsForm(form, this._pageElements); 

            this._preventDefaultForm(form);
            
            this._addEventListenerInputForm(inputsForm, form);
            
        });
    }

    _addEventListenerInputForm = (inputsForm, form) => {
        inputsForm.forEach((input) => {
            input.addEventListener('input', () => this._validationInputAndForm(inputsForm, form, input));
        });
    }

    _validationInputAndForm(inputsForm, form, input = 0){
        if(input){
            this._validInput(input, form);
        }else{
            inputsForm.forEach((inputForm) => {
                this._validInput(inputForm, this._validateForm);
            });
        }
        
        this._validForm(inputsForm, form);
    }

    _preventDefaultForm = (form) => {
        form.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
    }

    _findSpanError = (formInput, form) => {
        return form.querySelector(`#${formInput.id}-error`);
    }

    _validInput = (formInput, form) => {
        const spanError = this._findSpanError(formInput, form);
      
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

    _validForm = (formInputs, form) => {
        const buttonSave = form.querySelector(this._pageElements.buttonSaveForm);
      
        this._isFormInvalid(formInputs) ? 
            buttonDisabled(buttonSave) : 
            buttonActivated(buttonSave);
    }
}