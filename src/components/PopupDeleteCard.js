import Popup from "./Popup"

export default class PopupDeleteCard extends Popup{
    constructor(pageElements){
        const {popupDeleteCard, buttonClosePopup, buttonDeleteCardInPopup} =  pageElements;
        super(popupDeleteCard, buttonClosePopup, buttonDeleteCardInPopup);
        this._buttonDeleteCardInPopup = document.querySelector(buttonDeleteCardInPopup);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    setEventListeners(deleteCard){
        super.setEventListeners();
        this._buttonDeleteCardInPopup.addEventListener('click', () => {
            deleteCard();
        });
    }
}