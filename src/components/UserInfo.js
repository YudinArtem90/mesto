import {
    inputNamePopupEditProfile,
    inputInfoPopupEditProfile,
    namePage,
    informPage
} from '../index';

export default class UserInfo{
    constructor(name, info){
        this._name = name;
        this._info = info;
    }

    getUserInfo(NameNew, InfoNew){
        // namePage.textContent = NameNew;
        // informPage.textContent = InfoNew;
        return {
            name : this._name,
            info : this._info
        }
    }

    setUserInfo(NameNew, InfoNew){
        namePage.textContent = NameNew;
        informPage.textContent = InfoNew;
    }
}