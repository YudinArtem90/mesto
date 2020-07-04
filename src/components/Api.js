export default class Api{
    constructor({baseUrl, groupId, authorization}){
        this._baseUrl= baseUrl;
        this._groupId = groupId;
        this._data = {
            headers: {
                authorization: authorization
            }
        };
    }

    _getData({method = "GET", body, contentType = ''}){
        this._resetParameters();

        this._data.method = method;
        if(body){
            this._data.body = JSON.stringify(body);
        }
        if(contentType){
            this._data.headers['Content-Type'] = contentType;
        }
    }

    _resetParameters(){
        delete this._data.method;
        delete this._data.body;
        delete this._data.headers['Content-Type'];
    }

    _getResult(res){
        return res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/${this._groupId}/users/me`, this._data)
                    .then(res => { return this._getResult(res) });
    }

    getCards(){
        return fetch(`${this._baseUrl}/${this._groupId}/cards`, this._data)
                    .then(res => { return this._getResult(res) });
    }

    addCard(name, link){

        this._getData({
            method: 'POST',
            body: { 
                name: name,
                link: link
            },
            contentType: 'application/json'
        });

        return fetch(`${this._baseUrl}/${this._groupId}/cards`, this._data)
                .then(res => { return this._getResult(res) });
    }

    deleteCard(cardId){
        this._getData({
            method: 'DELETE'
        });

        return fetch(`${this._baseUrl}/${this._groupId}/cards/${cardId}`, this._data)
                .then(res => { return this._getResult(res) });
    }

    addLikeOrDislikeCard(cardId, isLike){
        this._getData({
            method: isLike ? 'PUT' : 'DELETE'
        });

        return fetch(`${this._baseUrl}/${this._groupId}/cards/likes/${cardId}`, this._data)
                .then(res => { return this._getResult(res) });
    }


    editProfileForm(data){
        const {informPerson, namePerson} = data;

        this._getData({
            method: 'PATCH',
            body: { 
                name: namePerson,
                about: informPerson
            },
            contentType: 'application/json'
        });

        return fetch(`${this._baseUrl}/${this._groupId}/users/me`, this._data)
                .then(res => { return this._getResult(res) });
    }

    editAvatar(linkCard){
        this._getData({
            method: 'PATCH',
            body: { avatar: linkCard},
            contentType: 'application/json'
        });

        return fetch(`${this._baseUrl}/${this._groupId}/users/me/avatar`, this._data)
                    .then(res => { return this._getResult(res) });
    }
}