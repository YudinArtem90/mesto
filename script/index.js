import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, pageElements} from './data.js';

const ESCAPE_KEY_CODE = 27;
const sectionElements = document.querySelector(pageElements.sectionElements);

/**
 * Popups 
 */

const popupEditProfile = document.querySelector(pageElements.popupEditProfile);
const popupAddCard = document.querySelector(pageElements.popupAddCard);
const popupViewPhoto = document.querySelector(pageElements.popupViewPhoto);

/**
 * Формы 
 */
const formEditProfile = document.querySelector(pageElements.formEditProfile);
const formCardAdd = document.querySelector(pageElements.formCardAdd);

/**
 * Кнопки 
 */
const buttonClosePopupViewPhoto = document.querySelector(pageElements.buttonClosePopupViewPhoto);
const buttonClosePopupFormEditProfile = formEditProfile.querySelector('.popup__icon-close-form');
const buttonClosePopupFormCardAdd = formCardAdd.querySelector('.popup__icon-close-form');
const buttonOpenPopupEditProfileInfo = document.querySelector(pageElements.buttonOpenPopupEditProfileInfo);
const buttonOpenPopupAddCard = document.querySelector(pageElements.buttonOpenPopupAddCard);
const buttonSavePopupEditProfile = formEditProfile.querySelector('.popup__save-button');
const buttonSavePopupAddCard = formCardAdd.querySelector('.popup__save-button');

/**
 * Поля ввода-вывода 
 */
const inputNamePopupEditProfile = document.querySelector(pageElements.inputNamePopupEditProfile);
const inputInfoPopupEditProfile = document.querySelector(pageElements.inputInfoPopupEditProfile);
const popupAddCardInputName = formCardAdd.querySelector('.popup__field_name_card');
const popupAddCardInputLink = formCardAdd.querySelector('.popup__field_link_card');

/**
 * Данные страницы
 */
const namePage = document.querySelector(pageElements.namePage);
const informPage = document.querySelector(pageElements.informPage);

/**
 * Модальное окно просмотра фото
 */
const containerPopupViewPhoto = document.querySelector(pageElements.containerPopupViewPhoto);
const infoPopupViewPhoto = document.querySelector(pageElements.infoPopupViewPhoto);

const templateCard = document.querySelector(pageElements.templateCard).content;

const addEventListenerEsc = () => {
    document.addEventListener('keyup',closePopupOverlayOrEsc);
}

const removeEventListenerEsc = () => {
    document.removeEventListener('keyup',closePopupOverlayOrEsc);
}

/**
 * Общий метод закрытия и открытия модалки 
 */
const openAndClosePopup = (popup, event) => {
    const isOpenPopup = popup.classList.toggle("popup_opened");
    isOpenPopup ? addEventListenerEsc() : removeEventListenerEsc();
    
    event.stopPropagation();
}

const buttonDisabled = (buttonSave) => {
    buttonSave.classList.add('popup__save-button_blocking');
    buttonSave.disabled = true;
}
  
const buttonActivated = (buttonSave) => {
    buttonSave.classList.remove('popup__save-button_blocking');
    buttonSave.disabled = false;
}
  
const isButtonActive = (buttonSave) => {
    return !buttonSave.classList.contains('popup__save-button_blocking');
}

const findInputsForm = (form, objectPageElements) => {
    return form.querySelectorAll(objectPageElements.inputForm);
}

/**
 * Заполнение формы редактирования пользователя
 */
const fillingOutEditProfileForm = (event) => {
    const inputsForm = findInputsForm(formEditProfile, pageElements);
    inputNamePopupEditProfile.value = namePage.textContent;
    inputInfoPopupEditProfile.value = informPage.textContent;
    
    const validForm = new FormValidator(pageElements, formEditProfile);
    validForm.enableValidation(inputsForm);
    openAndClosePopup(popupEditProfile, event);
}

const editProfile = (event) => {
    if(isButtonActive(event.target)){
        event.preventDefault();
        namePage.textContent = inputNamePopupEditProfile.value;
        informPage.textContent = inputInfoPopupEditProfile.value;
        openAndClosePopup(popupEditProfile, event);
    }
}

/**
 * Добавление карточки
 */
const addOneCard = (event) => {
    if(isButtonActive(event.target)){
        const data = {
            name : popupAddCardInputName.value, 
            link : popupAddCardInputLink.value
        }
        const card = new Card(data, templateCard);
        card.addCard();
        event.preventDefault();
        formCardAdd.reset();
        openAndClosePopup(popupAddCard, event);
    }
}

const initialAddingCards = () => {
    initialCards.forEach((data) => {
        const card = new Card(data, templateCard);
        card.addCard();
    });
}

const closePopupOverlayOrEsc = (event) => {
    const clickInEditProfilePopup = formEditProfile.contains(event.target);
    const clickInFormCardAddPopup = formCardAdd.contains(event.target);
    const clickInViewPhotoPopup = containerPopupViewPhoto.contains(event.target);
    
    const isOpenEditProfilePopup = popupEditProfile.classList.contains("popup_opened");
    const isOpenFormCardAddPopup = popupAddCard.classList.contains("popup_opened");
    const isOpenViewPhotoPopup = popupViewPhoto.classList.contains("popup_opened");

    const isEsc = (event.keyCode || event.which) === ESCAPE_KEY_CODE;

    if(isEsc){
        if(isOpenEditProfilePopup){
            openAndClosePopup(popupEditProfile, event);
        }

        if(isOpenFormCardAddPopup){
            openAndClosePopup(popupAddCard, event);
        }

        if(isOpenViewPhotoPopup){
            openAndClosePopup(popupViewPhoto, event);
        }
    }else if(event.type === 'click'){
        if(!clickInEditProfilePopup && isOpenEditProfilePopup){
            openAndClosePopup(popupEditProfile, event);
        }

        if(!clickInFormCardAddPopup && isOpenFormCardAddPopup){
            openAndClosePopup(popupAddCard, event);
        }

        if(!clickInViewPhotoPopup && isOpenViewPhotoPopup){
            openAndClosePopup(popupViewPhoto, event);
        }
    }
}

const openPopupAddCard = (event) => {
    const buttonSaveForm = popupAddCard.querySelector(pageElements.buttonSaveForm);
    buttonDisabled(buttonSaveForm)
    openAndClosePopup(popupAddCard, event);
}

const addEventListenerClosekPopup = () => {
    popupEditProfile.addEventListener('click',closePopupOverlayOrEsc);
    popupAddCard.addEventListener('click',closePopupOverlayOrEsc);
    popupViewPhoto.addEventListener('click',closePopupOverlayOrEsc);
}


const preventDefaultForm = (form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
}
  
const addEventListenerInputForm = (inputsForm, form, objectPageElements) => {
    inputsForm.forEach((input) => {
        const formValidator = new FormValidator(objectPageElements, form);
        input.addEventListener('input', () => formValidator.enableValidation(inputsForm, input));
    });
}
  
const addValidatorInputsForm = (objectPageElements) => {
    const forms = document.querySelectorAll(objectPageElements.form);

    forms.forEach((form) => {
        const inputsForm = findInputsForm(form, objectPageElements); 

        preventDefaultForm(form);
        
        addEventListenerInputForm(inputsForm, form, objectPageElements);
        
    });
}

/**
 * Динамическое добавление карточек
 */
initialAddingCards();

/**
 * закрытия модальных окон
 */
buttonClosePopupViewPhoto.addEventListener('click', (event) => openAndClosePopup(popupViewPhoto, event));
buttonClosePopupFormEditProfile.addEventListener('click', (event) => openAndClosePopup(popupEditProfile, event));
buttonClosePopupFormCardAdd.addEventListener('click', (event) => openAndClosePopup(popupAddCard, event));

buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

buttonSavePopupEditProfile.addEventListener('click', editProfile);
buttonSavePopupAddCard.addEventListener('click', addOneCard);

addEventListenerClosekPopup();
addValidatorInputsForm(pageElements);

export {
    containerPopupViewPhoto, 
    infoPopupViewPhoto, 
    popupViewPhoto , 
    sectionElements, 
    openAndClosePopup,
    buttonDisabled, 
    buttonActivated
};