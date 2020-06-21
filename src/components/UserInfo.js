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

    setUserInfo(NameNew, InfoNew){
        this._inputName.textContent = this._name = NameNew;
        this._inputInfo.textContent = this._info = InfoNew;
    }
}