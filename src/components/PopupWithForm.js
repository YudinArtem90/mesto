import Popup from "./Popup";

export default class PopupWithForm extends Popup{
    constructor(selector, buttonClose, {handleFormSubmit}){
        super(selector, buttonClose);
        this._form = this._popup.querySelector('form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputsForm = this._form.querySelectorAll('input');
        this._formValues = {};
    }

    setEventListeners(){
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._getInputValues());
            });
    }

    close(){
        super.close();
        this._form.reset();
    }

    _getInputValues(){
        this._inputsForm.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
    }
}