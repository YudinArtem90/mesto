import {
    containerPopupViewPhoto,
    infoPopupViewPhoto,
    popupViewPhoto,
    openAndClosePopup
} from '../index.js';

export default class Card{

    constructor(data, template){
        this._name = data.name;
        this._link = data.link;
        this._templateCard = template;
    }

    _addLikeOrDislikeCard() {
        this._buttonCardLike.classList.toggle("element__button-like_action");
    }

    _createPopupViewPhoto(event){
        containerPopupViewPhoto.src = event.target.currentSrc; 
        containerPopupViewPhoto.setAttribute('alt', `Фото - ${this._name}`);
        infoPopupViewPhoto.textContent = this._name;
        openAndClosePopup(popupViewPhoto, event);
    }

    _deleteCard(){
        this._element.remove();
        this._element = null;
    }

    getCard (){
        this._element = this._templateCard.firstElementChild.cloneNode(true);
        this._buttonDeleteCard = this._element.querySelector('.element__button-delete');
        this._buttonCardLike = this._element.querySelector('.element__button-like');
        this._image =  this._element.querySelector('.element__image');
        const text = this._element.querySelector('.element__text');
    
        this._image.src = this._link;
        this._image.setAttribute('alt', this._name);
        text.textContent = this._name;

        this._addEventListenerCard();

        return this._element;
    }

    _addEventListenerCard(){
        this._buttonCardLike.addEventListener('click', this._addLikeOrDislikeCard);
        this._image.addEventListener('click', this._createPopupViewPhoto);
        this._buttonDeleteCard.addEventListener('click', () => this._deleteCard(), {onсe : true});
    }
}