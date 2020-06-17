import Popup from "./Popup";

export default class PopupWithForm extends Popup{
    constructor(selector, {handleFormSubmit}){
        super(selector);
        this._form = this._selector.querySelector('form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputsForm = this._form.querySelectorAll('input');
        this._formValues = {};

        this.close = this.close.bind(this);
        //this.setEventListeners = this.setEventListeners.bind(this);
    }

    setEventListeners(){
        super.setEventListeners();
        console.log('setEventListeners');
        const _this = this;
        this._form.addEventListener('submit', function (evt) {
            // console.log('submit');
            // console.log(_this);
            // debugger;
            evt.preventDefault();
            _this._handleFormSubmit(evt);
          }, {once : true});
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