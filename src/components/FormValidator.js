import {
    buttonDisabled, 
    buttonActivated, 
    findInputsForm, 
    findSpanError,
    showInputError,
    hideInputError
} from '../index.js';

export default class FormValidator{
    constructor(pageElements, validateForm = 0){
        this._pageElements = pageElements;
        this._validateForm = validateForm;
    }

    enableValidation(){
        const forms = document.querySelectorAll(this._pageElements.form);

        forms.forEach((form) => {
            const inputsForm = findInputsForm(form, this._pageElements); 

            this._preventDefaultForm(form);
            
            this._addEventListenerInputForm(inputsForm, form);
            
        });
    }

    _addEventListenerInputForm (inputsForm, form) {
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

    _preventDefaultForm (form) {
        form.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
    }

    _validInput(formInput, form) {
        const spanError = findSpanError(formInput, form);
      
        formInput.validity.valid ?
                hideInputError(spanError, formInput) :
                showInputError(spanError, formInput);
    }

    _isFormInvalid(formInputs) {
        return Array.from(formInputs).some((input) => {
          return !input.validity.valid;
        });
    }

    _validForm(formInputs, form){
        const buttonSave = form.querySelector(this._pageElements.buttonSaveForm);
      
        this._isFormInvalid(formInputs) ? 
                buttonDisabled(buttonSave) : 
                buttonActivated(buttonSave);
    }
}