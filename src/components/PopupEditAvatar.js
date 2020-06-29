import Popup from "./Popup";

export default class PopupEditAvatar extends Popup{
    constructor(pageElements, {handleFormSubmit}){
        const {popupEditAvatar, buttonEditAvatar, buttonClosePopup, inputForm} =  pageElements;
        super(popupEditAvatar, buttonClosePopup);
        this._form = this._popup.querySelector('form');
        this._linkAvatar = this._form.querySelector(inputForm);
        this._handleFormSubmit = handleFormSubmit;
        this.setEventListeners();
    }

    setEventListeners(){
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._linkAvatar.value);
            });
    }

    close(){
        super.close();
        this._form.reset();
    }
}