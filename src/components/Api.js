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

    getData({method = "GET", body, contentType = ''}, url){
        this._resetParameters();

        this._data.method = method;
        this._url = `${this._baseUrl}/${this._groupId}/${url}`;

        if(body){
            this._data.body = JSON.stringify(body);
        }
        if(contentType){
            this._data.headers['Content-Type'] = contentType;
        }
        
        return this._getPromise();
    }

    _getPromise(){
        return fetch(this._url, this._data)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
                })
    }

    _resetParameters(){
        delete this._data.method;
        delete this._data.body;
        delete this._data.headers['Content-Type'];
        this._url = '';
    }
}