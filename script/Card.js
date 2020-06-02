import {
    containerPopupViewPhoto,
    infoPopupViewPhoto,
    popupViewPhoto,
    sectionElements,
    openAndClosePopup
} from './index.js';

export default class Card{

    constructor(data, template){
        this._name = data.name;
        this._link = data.link;
        this._templateCard = template;
        this._element = null;
    }

    _addLikeOrDislikeCard = (event) => {
        event.target.classList.toggle("element__button-like_action");
    }

    _createPopupViewPhoto = (event) => {
        const name = event.target.alt;
        containerPopupViewPhoto.src = event.target.currentSrc; 
        containerPopupViewPhoto.setAttribute('alt', `Фото - ${name}`);
        infoPopupViewPhoto.textContent = name;
        openAndClosePopup(popupViewPhoto, event);
    }

    _deleteCard = (buttonCardLike, image) => {
        buttonCardLike.removeEventListener('click', this._addLikeOrDislikeCard);
        image.removeEventListener('click', this._createPopupViewPhoto);
        this._element.remove();
        this._element = null;
    }

    _createTemplateCard = (name, link) => {
        this._element = this._templateCard.firstElementChild.cloneNode(true);
        const buttonDeleteCard = this._element.querySelector('.element__button-delete');
        const buttonCardLike = this._element.querySelector('.element__button-like');
        const image =  this._element.querySelector('.element__image');
        const text = this._element.querySelector('.element__text');
    
        image.src = link;
        image.setAttribute('alt', name);
        text.textContent = name;

        this._addEventListenerCard(buttonDeleteCard, buttonCardLike, image);

        return this._element;
    }

    _addEventListenerCard(buttonDeleteCard, buttonCardLike, image){
        buttonCardLike.addEventListener('click', this._addLikeOrDislikeCard);
        image.addEventListener('click', this._createPopupViewPhoto);
        buttonDeleteCard.addEventListener('click', () => this._deleteCard(buttonCardLike, image), {onсe : true});
    }

    addCard = () => {
        const card = this._createTemplateCard(this._name, this._link);
        return sectionElements.prepend(card);
    }
}