import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, pageElements} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

import './index.css';

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

const templateCard = document.querySelector(pageElements.templateCard).content;

// валидация форм
const validateFormEditProfile = new FormValidator(pageElements, formEditProfile);
const validateFormAddCard = new FormValidator(pageElements, formCardAdd);

// работа с модальным окном редактирования пользователя
const userInfo = new UserInfo(pageElements);

const createPopupViewPhoto = new PopupWithImage(pageElements);

const classPopupEditProfileForm = new PopupWithForm(
    pageElements.popupEditProfile, 
    pageElements.buttonClosePopup, {
    handleFormSubmit: (data) =>{
        const {informPerson, namePerson} = data;
        userInfo.setUserInfo(namePerson, informPerson);
        classPopupEditProfileForm.close();
}});

/**
 * Заполнение формы редактирования пользователя
 */
const fillingOutEditProfileForm = () => {
    const {name, info} = userInfo.getUserInfo();

    inputNamePopupEditProfile.value = name;
    inputInfoPopupEditProfile.value = info;

    validateFormEditProfile.enableValidation();
    classPopupEditProfileForm.open();
}

classPopupEditProfileForm.setEventListeners();


const addCards = (data, templateCard) => {
    const classList = new Section({data: data, renderer: (item) => {
        const classCard = new Card(item, templateCard, {
            handleCardClick: (_this) => {
                createPopupViewPhoto.open(
                    _this._image.src,
                    _this._name
                );
            } 
        });
        const card = classCard.getCard();

        classList.addItem(card);
    }}, pageElements.sectionElements);

    classList.renderItems();
}


const classList = new Section({renderer: (item) => {
    const classCard = new Card(item, templateCard, {
        handleCardClick: (_this) => {
            createPopupViewPhoto.open(
                _this._image.src,
                _this._name
            );
        } 
    });
    const card = classCard.getCard();

    classList.addItem(card);
}}, pageElements.sectionElements);

classList.renderItems(initialCards);

const addOneCard = () => {
    const data = [{
        name : popupAddCardInputName.value, 
        link : popupAddCardInputLink.value
    }];
    classList.renderItems(data);
}

const classPopupAddCard = new PopupWithForm(
    pageElements.popupAddCard, 
    pageElements.buttonClosePopup, {
    handleFormSubmit: (evt) =>{
        addOneCard();
        classPopupAddCard.close();
}});

classPopupAddCard.setEventListeners();

const openPopupAddCard = () => {
    validateFormAddCard.deleteError();
    classPopupAddCard.open();
}

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
