export default class Card{

    constructor({name, link, likes, _id, owner}, template, pageElements, IDENTIFIER_USER, api ,{handleCardClick}, {handleDeleteCardClick}){
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._templateCard = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._pageElements = pageElements;
        this._cardId = _id;
        this._api = api;
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
        this._deleteCard = this._deleteCard.bind(this);
    }

    _addLikeOrDislikeCard() {
        this._api.setUrlAddLikeOrDislikeCard(this._cardId)
        this._api.getData({
            method: this._isLike ? 'PUT' : 'DELETE'
        })
        this._api.getPromise()
            .then((res) => {
                this._countLike.textContent = res.likes.length;
                this._buttonCardLike.classList.toggle("element__button-like_action");
            })
            .catch((error) => console.log('Ошибка при проставлении или удалении лайка', error));


        this._isLike = !this._isLike;
    }

    _deleteCard(){
        const thisClass = this;
       
        this._api.setUrlAddLikeOrDislikeCard(this._cardId)
        this._api.getData({
            method: 'DELETE'
        })

        return new Promise(function(resolve, reject) {
            thisClass._api.getPromise()
                .then((res) => {
                    thisClass._element.remove();
                    thisClass._element = null;
                    resolve(true);
                })
                .catch((error) => console.log('Ошибка при удалении карточки', error));   
        });
    }

    _openImage(){
        this._handleCardClick(
            this._image.src, this._name
        );
    }

    _openPopupDeleteCard(){
        this._handleDeleteCardClick(
            this._deleteCard
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
        this._buttonDeleteCard.addEventListener('click', () => this._openPopupDeleteCard(), {onсe : true});
    }
}