export default class Card{

    constructor({name, link, likes}, template, pageElements, {handleCardClick}){
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._templateCard = template;
        this._handleCardClick = handleCardClick;
        this._pageElements = pageElements;
        
        this._addLikeOrDislikeCard = this._addLikeOrDislikeCard.bind(this);
        this._openImage = this._openImage.bind(this);
    }

    _addLikeOrDislikeCard() {
        this._buttonCardLike.classList.toggle("element__button-like_action");
    }

    _deleteCard(){
        this._element.remove();
        this._element = null;
    }

    _openImage(){
        this._handleCardClick(
            this._image.src, this._name
        );
    }

    getCard (){
        const {countLike} = this._pageElements;

        this._element = this._templateCard.firstElementChild.cloneNode(true);
        this._buttonDeleteCard = this._element.querySelector('.element__button-delete');
        this._buttonCardLike = this._element.querySelector('.element__button-like');
        this._image =  this._element.querySelector('.element__image');
        this._countLike = this._element.querySelector(countLike);
        const text = this._element.querySelector('.element__text');
    
        this._image.src = this._link;
        this._image.setAttribute('alt', this._name);
        text.textContent = this._name;
        this._countLike = this._likes;

        this._addEventListenerCard();

        return this._element;
    }

    _addEventListenerCard(){
        this._buttonCardLike.addEventListener('click', this._addLikeOrDislikeCard);
        this._image.addEventListener('click', this._openImage);
        this._buttonDeleteCard.addEventListener('click', () => this._deleteCard(), {onсe : true});
    }
}