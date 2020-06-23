export default class UserInfo{
    constructor(pageElements){
        const {namePage, informPage} = pageElements;

        this._inputName = document.querySelector(namePage);
        this._inputInfo = document.querySelector(informPage);

        this._name = this._inputName.textContent;
        this._info = this._inputInfo.textContent;
    }

    getUserInfo(){
        return {
            name : this._name,
            info : this._info
        }
    }

    setUserInfo(nameNew, infoNew){
        this._name = nameNew;
        this._info = infoNew;
        this._inputName.textContent = nameNew;
        this._inputInfo.textContent = infoNew;
    }
}