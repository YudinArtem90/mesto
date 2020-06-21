const ESCAPE_KEY_CODE = 27;

export default class Popup{
    
    constructor(selector, selectorButtonClose){
        this._selector = selector;
        this._selectorButtonClose = selectorButtonClose;
        this._popup = document.querySelector(this._selector);
        this._buttonClose = this._popup.querySelector(selectorButtonClose);

        this.close = this.close.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);

        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keyup', (event) => this._handleEscClose(event));
    }

    open(){
        this._popup.classList.add("popup_opened");
    }

    close(){
        this._popup.classList.remove("popup_opened");
    }

    setEventListeners(){
        this._buttonClose.addEventListener('click', this.close);
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