import Popup from "./Popup";

export default class PopupEditAvatar extends Popup{
    constructor(pageElements, {handleFormSubmit}){
        const {popupEditAvatar, buttonClosePopup, inputForm, buttonSavePopupEditAvatar} =  pageElements;
        super(popupEditAvatar, buttonClosePopup, buttonSavePopupEditAvatar);
        this._form = this._popup.querySelector('form');
        this._linkAvatar = this._form.querySelector(inputForm);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners(){
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this.addLoader();
                this._handleFormSubmit(this._linkAvatar.value);
            });
    }

    close(){
        super.close();
        this._form.reset();
    }
}