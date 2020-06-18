import Popup from "./Popup";
import {infoPopupViewPhoto, containerPopupViewPhoto} from '../pages/index';

export default class PopupWithImage extends Popup{
    constructor(src, name, selector){
        super(selector);
        this._src = src;
        this._name = name;
    }

    open() {
        containerPopupViewPhoto.src = this._src; 
        containerPopupViewPhoto.setAttribute('alt', `Фото - ${this._name}`);
        infoPopupViewPhoto.textContent = this._name;
        super.setEventListeners();
        super.open();
    }
}