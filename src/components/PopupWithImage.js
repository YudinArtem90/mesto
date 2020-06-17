import Popup from "./Popup";
import {pageElements} from '../utils/data';
import {infoPopupViewPhoto, containerPopupViewPhoto} from '../index';

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