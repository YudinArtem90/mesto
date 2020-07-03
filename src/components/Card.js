export default class Card{

    constructor({name, link, likes, _id, owner}, template, pageElements, IDENTIFIER_USER, {handleCardClick}, {addLikeOrDislikeCard}, {openPopupDeleteCard}){
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._templateCard = template;
        this._handleCardClick = handleCardClick;
        this._openPopupDeleteCard = openPopupDeleteCard;
        this._pageElements = pageElements;
        this._cardId = _id;
        this._isLike = true;
        this._ownerId = owner._id;

        const {
            countLike, 
            modifyClassButtonDeleteCardDeactivation,
            buttonDeleteCard,
            buttonCardLike,
            imageCard,
            textCard
        } = this._pageElements;

        this._element = this._templateCard.firstElementChild.cloneNode(true);
        this._countLike = this._element.querySelector(countLike);
        this._buttonDeleteCard = this._element.querySelector(buttonDeleteCard);
        this._buttonCardLike = this._element.querySelector(buttonCardLike);
        this._image =  this._element.querySelector(imageCard);
        this._text = this._element.querySelector(textCard);
        this._addLikeOrDislikeCard = addLikeOrDislikeCard;

        if(this._ownerId !== IDENTIFIER_USER){
            this._buttonDeleteCard.classList.add(modifyClassButtonDeleteCardDeactivation);
        }

        this._openImage = this._openImage.bind(this);
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
        this._buttonCardLike.addEventListener('click', () => this._addLikeOrDislikeCard(this));
        this._image.addEventListener('click', this._openImage);
        this._buttonDeleteCard.addEventListener('click', () => this._openPopupDeleteCard(this));
    }
}