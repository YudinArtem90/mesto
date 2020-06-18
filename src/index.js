import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {initialCards, pageElements} from './utils/data.js';
import './pages/index.css';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';

// const ESCAPE_KEY_CODE = 27;
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

// const addEventListenerEsc = () => {
//     document.addEventListener('keyup',closePopupOverlayOrEsc);
// }

// const removeEventListenerEsc = () => {
//     document.removeEventListener('keyup',closePopupOverlayOrEsc);
// }

const findSpanError = (formInput, form) => {
    return form.querySelector(`#${formInput.id}-error`);
}

const showInputError = (spanError, form) => {
    form.classList.add('form__input_type_error');
    spanError.classList.add('popup__field-error_active');
    spanError.textContent = form.validationMessage;
};
  
  
const hideInputError = (spanError, form) => {
    form.classList.remove('form__input_type_error');
    spanError.classList.remove('popup__field-error_active');
    spanError.textContent = '';
};


/**
 * Общий метод закрытия и открытия модалки 
 */
const openAndClosePopup = (popup, modelPopup) => {

    // const isOpenPopup = popup.classList.toggle("popup_opened");
    //const OpenAndClosePopup = new Popup(popup);
    const isOpenPopup = popup.classList.contains("popup_opened");
    // isOpenPopup ? addEventListenerEsc() : removeEventListenerEsc();
    // isOpenPopup ? 
    //     modelPopup.close() : 
    //     modelPopup.open();
    // modelPopup.setEventListeners();

    if(isOpenPopup){
        modelPopup.close();
    }else{
        modelPopup.open();
        modelPopup.setEventListeners();
    }


    //event.stopPropagation();
}

const buttonDisabled = (buttonSave) => {
    buttonSave.classList.add('popup__save-button_blocking');
    buttonSave.disabled = true;
}
  
const buttonActivated = (buttonSave) => {
    buttonSave.classList.remove('popup__save-button_blocking');
    buttonSave.disabled = false;
}

const findInputsForm = (form, objectPageElements) => {
    return form.querySelectorAll(objectPageElements.inputForm);
}

/**
 * Убирает ошибки формы редактирования.
 * Когда открыешь форму, вводишь не валидные данные и закрываешь 
 * ее и снова открываешь.
 */
const deleteErrorEditProfileForm = () => {
    const inputsForm = findInputsForm(formEditProfile, pageElements);
    const buttonSave = formEditProfile.querySelector(pageElements.buttonSaveForm);
    inputsForm.forEach((input) => {
        const spanForm = findSpanError(input, popupEditProfile);
        hideInputError(spanForm, formEditProfile);
    });
    buttonActivated(buttonSave);
}

/**
 * Заполнение формы редактирования пользователя
 */
const fillingOutEditProfileForm = (event) => {

    const userInfo = new UserInfo(
        namePage.textContent,
        informPage.textContent
    );

    const modelPopup = new PopupWithForm(popupEditProfile, {
        handleFormSubmit: (evt) =>{
            evt.preventDefault();
            // namePage.textContent = inputNamePopupEditProfile.value;
            // informPage.textContent = inputInfoPopupEditProfile.value;
            userInfo.setUserInfo(
                inputNamePopupEditProfile.value,
                inputInfoPopupEditProfile.value
            );
            openAndClosePopup(popupEditProfile, modelPopup);
    }});

    // namePage.textContent = inputNamePopupEditProfile.value;
    // informPage.textContent = inputInfoPopupEditProfile.value;
    // popup.setEventListeners();


    const {name, info} = userInfo.getUserInfo();
    inputNamePopupEditProfile.value = name;
    inputInfoPopupEditProfile.value = info;
    // inputNamePopupEditProfile.value = namePage.textContent;
    // inputInfoPopupEditProfile.value = informPage.textContent;
    deleteErrorEditProfileForm();
    openAndClosePopup(popupEditProfile, modelPopup);
    // openAndClosePopup(popupEditProfile);
}

// const editProfile = (event) => {
//     event.preventDefault();
//     namePage.textContent = inputNamePopupEditProfile.value;
//     informPage.textContent = inputInfoPopupEditProfile.value;
//     openAndClosePopup(popupEditProfile);
// }

const addCards = (data, templateCard) => {
    // const classCard = new Card(data, templateCard);
    // const card = classCard.getCard();
    // console.log(data);
    // console.log(templateCard);
    
    const classList = new Section({data: data, renderer: (item) => {
        const classCard = new Card(item, templateCard, {
            handleCardClick: (event, _this) => {
                console.log('this', _this);
                console.log('event', event);
                console.log('popupViewPhoto', popupViewPhoto);
                const createPopupViewPhoto = new PopupWithImage(
                    event.target.currentSrc,
                    _this._name, 
                    popupViewPhoto
                );
                createPopupViewPhoto.open();
            } 
        });
        const card = classCard.getCard();

        classList.addItem(card);
    }}, pageElements.sectionElements);

    classList.renderItems();


    // sectionElements.prepend(card);
}

const addOneCard = (event) => {
    const data = [{
        name : popupAddCardInputName.value, 
        link : popupAddCardInputLink.value
    }];
    addCards(data, templateCard);
    //event.preventDefault();
    //formCardAdd.reset();
    //openAndClosePopup(popupAddCard);
}

// const initialAddingCards = () => {
    // initialCards.forEach((data) => {
        // addCards(initialCards, templateCard);
    // });
    // const classList = new Section({data: initialCards, renderer: (item) => {
    //     const classCard = new Card(item, templateCard);
    //     const card = classCard.getCard();

    //     classList.addItem(card);
    // }}, pageElements.sectionElements);

    // classList.renderItems();
// }

// const closePopupOverlayOrEsc = (event) => {
//     const clickInEditProfilePopup = formEditProfile.contains(event.target);
//     const clickInFormCardAddPopup = formCardAdd.contains(event.target);
//     const clickInViewPhotoPopup = containerPopupViewPhoto.contains(event.target);
    
//     const isOpenEditProfilePopup = popupEditProfile.classList.contains("popup_opened");
//     const isOpenFormCardAddPopup = popupAddCard.classList.contains("popup_opened");
//     const isOpenViewPhotoPopup = popupViewPhoto.classList.contains("popup_opened");

//     const isEsc = (event.keyCode || event.which) === ESCAPE_KEY_CODE;

//     if(isEsc){
//         if(isOpenEditProfilePopup){
//             openAndClosePopup(popupEditProfile, event);
//         }

//         if(isOpenFormCardAddPopup){
//             openAndClosePopup(popupAddCard, event);
//         }

//         if(isOpenViewPhotoPopup){
//             openAndClosePopup(popupViewPhoto, event);
//         }
//     }else if(event.type === 'click'){
//         if(!clickInEditProfilePopup && isOpenEditProfilePopup){
//             openAndClosePopup(popupEditProfile, event);
//         }

//         if(!clickInFormCardAddPopup && isOpenFormCardAddPopup){
//             openAndClosePopup(popupAddCard, event);
//         }

//         if(!clickInViewPhotoPopup && isOpenViewPhotoPopup){
//             openAndClosePopup(popupViewPhoto, event);
//         }
//     }
// }

const openPopupAddCard = (event) => {
    const modelPopup = new PopupWithForm(popupAddCard, {
        handleFormSubmit: (evt) =>{
            evt.preventDefault();
            addOneCard();
            openAndClosePopup(popupAddCard, modelPopup);
    }});


    const buttonSaveForm = popupAddCard.querySelector(pageElements.buttonSaveForm);
    buttonDisabled(buttonSaveForm)
    openAndClosePopup(popupAddCard, modelPopup);
}

// const addEventListenerClosekPopup = () => {
//     popupEditProfile.addEventListener('click',closePopupOverlayOrEsc);
//     popupAddCard.addEventListener('click',closePopupOverlayOrEsc);
//     popupViewPhoto.addEventListener('click',closePopupOverlayOrEsc);
// }

/**
 * Динамическое добавление карточек
 */
// initialAddingCards();
addCards(initialCards, templateCard);
/**
 * закрытия модальных окон
 */
// buttonClosePopupViewPhoto.addEventListener('click', (event) => openAndClosePopup(popupViewPhoto, event));
// buttonClosePopupFormEditProfile.addEventListener('click', (event) => openAndClosePopup(popupEditProfile, event));
// buttonClosePopupFormCardAdd.addEventListener('click', (event) => openAndClosePopup(popupAddCard, event));

buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

// buttonSavePopupEditProfile.addEventListener('click', editProfile);
// buttonSavePopupAddCard.addEventListener('click', addOneCard);

// addEventListenerClosekPopup();

const validation = new FormValidator(pageElements);
validation.enableValidation();

export {
    containerPopupViewPhoto, 
    infoPopupViewPhoto, 
    popupViewPhoto , 
    sectionElements, 
    openAndClosePopup,
    buttonDisabled, 
    buttonActivated,
    findInputsForm,
    showInputError,
    hideInputError,
    findSpanError,
    inputNamePopupEditProfile,
    inputInfoPopupEditProfile,
    namePage,
    informPage
};