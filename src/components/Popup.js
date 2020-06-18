import {pageElements} from '../utils/data.js';

const ESCAPE_KEY_CODE = 27;

export default class Popup{
    
    constructor(selector){
        this._selector = selector;
        
        this.close = this.close.bind(this);
    }

    open(){
        this._selector.classList.add("popup_opened");
        document.addEventListener('keyup', (event) => this._handleEscClose(event), {once : true});
    }

    close(){
        this._selector.classList.remove("popup_opened");
    }

    setEventListeners(){
        const {buttonCloseModalAddCardAndEditProfile, buttonClosePopupViewPhoto} = pageElements;
        let buttonClose = this._selector.querySelector(buttonCloseModalAddCardAndEditProfile);

        if(!buttonClose){
            buttonClose = this._selector.querySelector(buttonClosePopupViewPhoto);
        }
        
        buttonClose.addEventListener('click', this.close, {once : true});
    }

    _handleEscClose(event){
        const isEsc = (event.keyCode || event.which) === ESCAPE_KEY_CODE;
    
        isEsc ? this.close() : false;
    }
}