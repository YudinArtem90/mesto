export default class Card{

    constructor({name, link, likes, _id, owner}, template, pageElements, IDENTIFIER_USER, {ajax} ,{handleCardClick}){
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._templateCard = template;
        this._handleCardClick = handleCardClick;
        this._pageElements = pageElements;
        this._cardId = _id;
        this._ajax = ajax;
        this._isLike = true;
        this._ownerId = owner._id;

        const {countLike, modifyClassButtonDeleteCardDeactivation} = this._pageElements;

        this._element = this._templateCard.firstElementChild.cloneNode(true);
        this._countLike = this._element.querySelector(countLike);
        this._buttonDeleteCard = this._element.querySelector('.element__button-delete');
        this._buttonCardLike = this._element.querySelector('.element__button-like');
        this._image =  this._element.querySelector('.element__image');
        this._text = this._element.querySelector('.element__text');

        if(this._ownerId !== IDENTIFIER_USER){
            this._buttonDeleteCard.classList.add(modifyClassButtonDeleteCardDeactivation);
        }

        this._addLikeOrDislikeCard = this._addLikeOrDislikeCard.bind(this);
        this._openImage = this._openImage.bind(this);
    }

    _addLikeOrDislikeCard() {
        if(this._isLike){
            this._addLikeCard();
        }else{
            this._dislikeCard();
        }
        this._isLike = !this._isLike;
    }

    _addLikeCard(){
        this._ajax(
            `https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${this._cardId}`,
            'PUT'
            ).then((res) => {
                this._countLike.textContent = res.likes.length;
                this._buttonCardLike.classList.add("element__button-like_action");
            }); 
    }

    _dislikeCard(){
        this._ajax(
            `https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${this._cardId}`,
            'DELETE'
            ).then((res) => {
                this._countLike.textContent = res.likes.length;
                this._buttonCardLike.classList.remove("element__button-like_action");
            }); 
    }

    _deleteCard(){
        this._ajax(
            `https://mesto.nomoreparties.co/v1/cohort-12/cards/${this._cardId}`,
            'DELETE'
            ).then((res) => {
                this._element.remove();
                this._element = null;
            }); 
    }

    _openImage(){
        this._handleCardClick(
            this._image.src, this._name
        );
    }

    getCard (){

        this._image.src = this._link;
        this._image.setAttribute('alt', this._name);
        this._text.textContent = this._name;
        this._countLike.textContent = this._likes.length;

        this._addEventListenerCard();

        return this._element;
    }

    _addEventListenerCard(){
        this._buttonCardLike.addEventListener('click', this._addLikeOrDislikeCard);
        this._image.addEventListener('click', this._openImage);
        this._buttonDeleteCard.addEventListener('click', () => this._deleteCard(), {onсe : true});
    }
}