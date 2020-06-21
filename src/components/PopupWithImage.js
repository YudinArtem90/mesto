import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(pageElements){
        const {popupViewPhoto, buttonClosePopup, containerPopupViewPhoto, infoPopupViewPhoto} = pageElements;
        super(popupViewPhoto, buttonClosePopup);

        this._popupViewPhoto = document.querySelector(containerPopupViewPhoto);
        this._infoPopup = document.querySelector(infoPopupViewPhoto);
        super.setEventListeners();
    }

    open(src, name) {
        this._popupViewPhoto.src = '';
        this._popupViewPhoto.src = src; 
        this._popupViewPhoto.setAttribute('alt', `Фото - ${name}`);
        this._infoPopup.textContent = name;
        super.open();
    }
}