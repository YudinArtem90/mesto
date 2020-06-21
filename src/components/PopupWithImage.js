import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(src, name, pageElements){
        const {popupViewPhoto, buttonClosePopup, containerPopupViewPhoto, infoPopupViewPhoto} = pageElements;
        super(popupViewPhoto, buttonClosePopup);

        this._popupViewPhoto = document.querySelector(containerPopupViewPhoto);
        this._infoPopup = document.querySelector(infoPopupViewPhoto);
        this._src = src;
        this._name = name;
    }

    open() {
        this._popupViewPhoto.src = this._src; 
        this._popupViewPhoto.setAttribute('alt', `Фото - ${this._name}`);
        this._infoPopup.textContent = this._name;
        super.setEventListeners();
        super.open();
    }
}