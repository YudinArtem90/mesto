export default class Card{

    constructor({name, link}, template, {handleCardClick}){
        this._name = name;
        this._link = link;
        this._templateCard = template;
        this._handleCardClick = handleCardClick;
        
        this._addLikeOrDislikeCard = this._addLikeOrDislikeCard.bind(this);
    }

    _addLikeOrDislikeCard() {
        this._buttonCardLike.classList.toggle("element__button-like_action");
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
        this._image.addEventListener('click', (event) => this._handleCardClick(event, this));
        this._buttonDeleteCard.addEventListener('click', () => this._deleteCard(), {onсe : true});
    }
}