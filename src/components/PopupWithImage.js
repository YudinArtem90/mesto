import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(pageElements){
        const {popupViewPhoto, containerPopupViewPhoto, infoPopupViewPhoto} = pageElements;
        super(popupViewPhoto, pageElements);

        this._popupViewPhoto = document.querySelector(containerPopupViewPhoto);
        this._infoPopup = document.querySelector(infoPopupViewPhoto);
        super.setEventListeners();
    }

    open(src, name) {
        this._popupViewPhoto.src = '';
        this._popupViewPhoto.src = src; 
        this._popupViewPhoto.setAttribute('alt', `Фото - ${name}`);
        this._infoPopup.textContent = name;
        this._popupViewPhoto.onload = () => {
            super.open();
          };
    }
}