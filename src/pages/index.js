import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, pageElements} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

import './index.css';

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
const buttonOpenPopupEditProfileInfo = document.querySelector(pageElements.buttonOpenPopupEditProfileInfo);
const buttonOpenPopupAddCard = document.querySelector(pageElements.buttonOpenPopupAddCard);

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
    const isOpenPopup = popup.classList.contains("popup_opened");

    if(isOpenPopup){
        modelPopup.close();
    }else{
        modelPopup.open();
        modelPopup.setEventListeners();
    }
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


const editProfile = (userInfo, modelPopup) => {
    userInfo.setUserInfo(
        inputNamePopupEditProfile.value,
        inputInfoPopupEditProfile.value
    );
    openAndClosePopup(popupEditProfile, modelPopup);
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
            editProfile(userInfo, modelPopup);
    }});

    const {name, info} = userInfo.getUserInfo();
    inputNamePopupEditProfile.value = name;
    inputInfoPopupEditProfile.value = info;
    deleteErrorEditProfileForm();
    openAndClosePopup(popupEditProfile, modelPopup);
}

const addCards = (data, templateCard) => {

    const classList = new Section({data: data, renderer: (item) => {
        const classCard = new Card(item, templateCard, {
            handleCardClick: (event, _this) => {
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
}

const addOneCard = () => {
    const data = [{
        name : popupAddCardInputName.value, 
        link : popupAddCardInputLink.value
    }];
    addCards(data, templateCard);
}

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

/**
 * Динамическое добавление карточек
 */
addCards(initialCards, templateCard);

buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

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