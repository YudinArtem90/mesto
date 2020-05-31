import Card from './Card.js';
import {initialCards, pageElements} from './data.js';

const sectionElements = document.querySelector('.elements');
const ESCAPE_KEY_CODE = 27;
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
const buttonClosePopupViewPhoto = document.querySelector('.popup__icon-close-view-photo');
const buttonClosePopupFormEditProfile = formEditProfile.querySelector('.popup__icon-close-form');
const buttonClosePopupFormCardAdd = formCardAdd.querySelector('.popup__icon-close-form');
const buttonOpenPopupEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const buttonSavePopupEditProfile = formEditProfile.querySelector('.popup__save-button');
const buttonSavePopupAddCard = formCardAdd.querySelector('.popup__save-button');

/**
 * Поля ввода-вывода 
 */
const inputNamePopupEditProfile = document.querySelector('.popup__field_name_person');
const inputInfoPopupEditProfile = document.querySelector('.popup__field_inform_person');
const popupAddCardInputName = formCardAdd.querySelector('.popup__field_name_card');
const popupAddCardInputLink = formCardAdd.querySelector('.popup__field_link_card');

/**
 * Данные страницы
 */
const namePage = document.querySelector('.profile-info__name');
const informPage = document.querySelector('.profile-info__information-person');

/**
 * Модальное окно просмотра фото
 */
const containerPopupViewPhoto = document.querySelector('.popup__view-photo-container');
const infoPopupViewPhoto = document.querySelector('.popup__view-photo-info');

const templateCard = document.querySelector('#card').content;

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

/**
 * Заполнение формы редактирования пользователя
 */
const fillingOutEditProfileForm = (event) => {
    const inputsForm = findInputsForm(formEditProfile, pageElements);
    inputNamePopupEditProfile.value = namePage.textContent;
    inputInfoPopupEditProfile.value = informPage.textContent;
    
    validAll(formEditProfile, inputsForm, pageElements);
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
        event.preventDefault()
        addCard(popupAddCardInputName.value, popupAddCardInputLink.value);
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
    openAndClosePopup(popupAddCard,event);
}

const addEventListenerClosekPopup = () => {
    popupEditProfile.addEventListener('click',closePopupOverlayOrEsc);
    popupAddCard.addEventListener('click',closePopupOverlayOrEsc);
    popupViewPhoto.addEventListener('click',closePopupOverlayOrEsc);
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

export {containerPopupViewPhoto, infoPopupViewPhoto, popupViewPhoto , sectionElements, openAndClosePopup};