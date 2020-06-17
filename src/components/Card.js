import {
    containerPopupViewPhoto,
    infoPopupViewPhoto,
    popupViewPhoto,
    openAndClosePopup
} from '../index.js';
import PopupWithImage from './PopupWithImage.js';

export default class Card{

    constructor({name, link}, template){
        // debugger;
        this._name = name;
        this._link = link;
        this._templateCard = template;

        this._createPopupViewPhoto = this._createPopupViewPhoto.bind(this);
    }

    _addLikeOrDislikeCard() {
        this._buttonCardLike.classList.toggle("element__button-like_action");
    }

    _createPopupViewPhoto(event){
        // containerPopupViewPhoto.src = event.target.currentSrc; 
        // containerPopupViewPhoto.setAttribute('alt', `Фото - ${this._name}`);
        // infoPopupViewPhoto.textContent = this._name;
        // document.querySelector('.popup__view-photo-info').textContent = this._name;
        // openAndClosePopup(popupViewPhoto);
        // console.log( 'currentSrc', event.target.currentSrc);


        // console.log( '_name',
        //     this._name);

        //     console.log( '_templateCard', this._templateCard);
        // debugger;
        const createPopupViewPhoto = new PopupWithImage(
            event.target.currentSrc,
            this._name, 
            popupViewPhoto
        );
        createPopupViewPhoto.open();
    }

    _deleteCard(){
        this._element.remove();
        this._element = null;
    }

    getCard (){
        // debugger;
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
        // console.log('this', this);
        this._buttonCardLike.addEventListener('click', this._addLikeOrDislikeCard);
        this._image.addEventListener('click', this._createPopupViewPhoto);
        this._buttonDeleteCard.addEventListener('click', () => this._deleteCard(), {onсe : true});
    }
}