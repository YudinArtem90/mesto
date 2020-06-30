export default class Api{
    constructor({baseUrl, method = "GET", body, contentType = ''}){
        this._url = baseUrl;
        this._data = {
            method: method,
            headers: {
                authorization: 'f77ffc2a-fabb-4e1a-b96f-391d240718e4'
            }
        };
    
        if(body){
            this._data.body = JSON.stringify(body);
        }
    
        if(contentType){
            this._data['headers']['Content-Type'] = contentType;
        }
    }

    _getPromise(){
        const thisClass = this;
        return new Promise(function(resolve) {
            fetch(thisClass._url, thisClass._data)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
                })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => console.log('error', error))
            .finally((result) => console.log('result', result))
        })
    }

    getCards(list){
        this._getPromise().then(res => list.renderItems(res));
    }

    getUserInfo(userInfo){
        this._getPromise().then(res => {
            const {avatar, name, about} = res;
            userInfo.setUserInfo(name, about);
            userInfo.setUserAvatar(avatar);
        });
    }

    addCard(list, popupAddCard){
        this._getPromise().then(res => {
            list.renderItems([res]);
            popupAddCard.close();
            popupAddCard.removeLoader('Создать');
        });
    }

    editProfile(userInfo, popupEditProfileForm){
        this._getPromise().then(res => {
            const {name, about} = res;
            userInfo.setUserInfo(name, about);
            popupEditProfileForm.close();
            popupEditProfileForm.removeLoader('Сохранить');
        });
    }

    editAvatar(userInfo, createPopupEditAvatar){
        this._getPromise().then(res => {
            userInfo.setUserAvatar(res.avatar);
            createPopupEditAvatar.close();
            createPopupEditAvatar.removeLoader('Сохранить');
        });
    }

    likeCard(){
        const thisClass = this;
        return new Promise(function(resolve) {
            thisClass._getPromise().then(res => {
                resolve(res);
            });
        });
    }

    deleteCard(){
        const thisClass = this;
        return new Promise(function(resolve) {
            thisClass._getPromise().then(res => {
                resolve(res);
            });
        });
    }
}