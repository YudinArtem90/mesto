export default class Api1{
    constructor({baseUrl, groupId, authorization, method = "GET", body, contentType = ''}){
        this._baseUrl= baseUrl;
        this._groupId = groupId;
        this._data = {
            headers: {
                authorization: authorization
            }
        };
    }

    getData({method = "GET", body, contentType = ''}){

        this._resetParameters();

        this._data.method = method;
    
        if(body){
            this._data.body = JSON.stringify(body);
        }
    
        if(contentType){
            this._data.headers['Content-Type'] = contentType;
        }
    }

    getPromise(){
        return fetch(this._url, this._data)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
                })
    }

    setUrlEditAvatar(){
        this._url = `${this._baseUrl}/${this._groupId}/users/me/avatar`;
    }

    setUrlEditProfile(){
        this._url = `${this._baseUrl}/${this._groupId}/users/me`;
    }

    setUrlGetCards(){
        this._url = `${this._baseUrl}/${this._groupId}/cards`;
    }

    setUrlAddLikeOrDislikeCard(cardId){
        this._url = `${this._baseUrl}/${this._groupId}/cards/likes/${cardId}`;
    }

    _resetParameters(){
        delete this._data.method;
        delete this._data.body;
        delete this._data.headers['Content-Type'];
    }
}