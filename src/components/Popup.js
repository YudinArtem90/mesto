const ESCAPE_KEY_CODE = 27;

export default class Popup{
    
    constructor(selector){
        this._selector = selector;
        this._popup = document.querySelector(this._selector);

        this.close = this.close.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    open(){
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keyup', (event) => this._handleEscClose(event), {once : true});
        this._popup.classList.add("popup_opened");
    }

    close(){
        this._popup.classList.remove("popup_opened");
        this._popup.removeEventListener('click', this._handleOverlayClose);
    }

    setEventListeners(){
        const {buttonCloseModalAddCardAndEditProfile, buttonClosePopupViewPhoto} = pageElements;
        let buttonClose = this._popup.querySelector(buttonCloseModalAddCardAndEditProfile);

        if(!buttonClose){
            buttonClose = this._popup.querySelector(buttonClosePopupViewPhoto);
        }
        
        buttonClose.addEventListener('click', this.close, {once : true});
    }

    _handleEscClose(event){
        const isEsc = (event.keyCode || event.which) === ESCAPE_KEY_CODE;
    
        isEsc ? this.close() : false;
    }

    _handleOverlayClose(event){
        if(event.target === this._popup){
            this.close();
        }
    }
}