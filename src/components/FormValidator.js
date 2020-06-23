
export default class FormValidator{
    constructor(pageElements, form){
        this._pageElements = pageElements;
        this._form = form;

        this._inputsForm = this._findInputsForm();
        this._buttonSave = form.querySelector(pageElements.buttonSaveForm);
        this._addEventListenerInputForm();
    }

    validateForm(){
        this._inputsForm.forEach((input) => {
             this._validationInputAndForm(input);
        });
    }

    deleteError(){
        this._inputsForm.forEach((input) => {
            const spanForm = this._findSpanError(input);
            this._hideInputError(spanForm, input);
        });
        this._buttonDisabled();
    }

    _addEventListenerInputForm () {
        this._inputsForm.forEach((input) => {
            input.addEventListener('input', () => this._validationInputAndForm(input));
        });
    }

    _validationInputAndForm(input){
        this._validateInput(input);
        this._validateForm();
    }

    _validateForm(){
        this._isFormInvalid() ? 
                this._buttonDisabled() : 
                this._buttonActivated();
    }

    _validateInput(input){
        const spanError = this._findSpanError(input);

        input.validity.valid ?
                this._hideInputError(spanError, input) :
                this._showInputError(spanError, input);
    }

    _showInputError(spanError, input){
        const {modifyClassFormInputTypeError, modifyClassPopupFieldError} = this._pageElements;

        input.classList.add(modifyClassFormInputTypeError);
        spanError.classList.add(modifyClassPopupFieldError);
        spanError.textContent = input.validationMessage;
    };
      
      
    _hideInputError(spanError, input){
        const {modifyClassFormInputTypeError, modifyClassPopupFieldError} = this._pageElements;

        input.classList.remove(modifyClassFormInputTypeError);
        spanError.classList.remove(modifyClassPopupFieldError);
        spanError.textContent = '';
    };

    _buttonDisabled(){
        this._buttonSave.classList.add(this._pageElements.modifyClassButtonSaveBlocking);
        this._buttonSave.disabled = true;
    }
      
    _buttonActivated(){
        this._buttonSave.classList.remove(this._pageElements.modifyClassButtonSaveBlocking);
        this._buttonSave.disabled = false;
    }

    _isFormInvalid() {
        return Array.from(this._inputsForm).some((input) => {
          return !input.validity.valid;
        });
    }

    _findSpanError(formInput) {
        return this._form.querySelector(`#${formInput.id}-error`);
    }

    _findInputsForm(){
        return this._form.querySelectorAll(this._pageElements.inputForm);
    }
}