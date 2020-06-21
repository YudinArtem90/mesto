
export default class FormValidator{
    constructor(pageElements, form){
        this._pageElements = pageElements;
        this._form = form;

        this._inputsForm = this._findInputsForm();
        this._buttonSave = form.querySelector(pageElements.buttonSaveForm);
        this._addEventListenerInputForm();
    }

    enableValidation(){
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
        input.classList.add('form__input_type_error');
        spanError.classList.add('popup__field-error_active');
        spanError.textContent = input.validationMessage;
    };
      
      
    _hideInputError(spanError, input){
        input.classList.remove('form__input_type_error');
        spanError.classList.remove('popup__field-error_active');
        spanError.textContent = '';
    };

    _buttonDisabled(){
        this._buttonSave.classList.add('popup__save-button_blocking');
        this._buttonSave.disabled = true;
    }
      
    _buttonActivated(){
        this._buttonSave.classList.remove('popup__save-button_blocking');
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