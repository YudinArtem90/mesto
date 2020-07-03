const ESCAPE_KEY_CODE = 27;

export default class Popup{
    
    constructor(selector, selectorButtonClose, buttonSave = null){
        
        this._selector = selector;
        this._popup = document.querySelector(this._selector);
        this._buttonClose = this._popup.querySelector(selectorButtonClose);
        this._buttonSave = buttonSave !== null ? this._popup.querySelector(buttonSave) : null;
       
        this.close = this.close.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.open = this.open.bind(this);
    }

    open(){
        this._popup.classList.add("popup_opened");
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove("popup_opened");
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners(){
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
        this._buttonClose.addEventListener('click', this.close);
    }

    addLoader(){
        this._buttonSave.textContent = 'Сохранение...';
    }

    removeLoader(text){
        this._buttonSave.textContent = text;
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