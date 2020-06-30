import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {pageElements, IDENTIFIER_USER} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';
import PopupEditAvatar from '../components/PopupEditAvatar.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';

/**
 * Формы 
 */
const formEditProfile = document.querySelector(pageElements.formEditProfile);
const formCardAdd = document.querySelector(pageElements.formCardAdd);
const formEditAvatar = document.querySelector(pageElements.formEditAvatar);

/**
 * Кнопки 
 */
const buttonOpenPopupEditProfileInfo = document.querySelector(pageElements.buttonOpenPopupEditProfileInfo);
const buttonOpenPopupAddCard = document.querySelector(pageElements.buttonOpenPopupAddCard);
const buttonOpenPopupEditAvatar = document.querySelector(pageElements.buttonOpenPopupEditAvatar);
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
const validateFormEditAvatar = new FormValidator(pageElements, formEditAvatar);

// работа с модальным окном редактирования пользователя
const userInfo = new UserInfo(pageElements);

const createPopupViewPhoto = new PopupWithImage(pageElements);
const popupDeleteCard = new PopupDeleteCard(pageElements);

const createPopupEditAvatar = new PopupEditAvatar(pageElements, {
    handleFormSubmit: (linkAvatar) =>{

        const editAvatar = new Api({
            baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar',
            method: 'PATCH',
            body: { avatar: linkAvatar},
            contentType: 'application/json'
          });

          editAvatar.editAvatar(userInfo, createPopupEditAvatar);
    }
});

createPopupEditAvatar.setEventListeners();

const popupEditProfileForm = new PopupWithForm(
    pageElements.popupEditProfile, 
    pageElements.buttonClosePopup,
    pageElements.buttonSavePopupEditProfile, {
    handleFormSubmit: (data) =>{
        const {informPerson, namePerson} = data;

        const editProfile = new Api({
            baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/users/me',
            method: 'PATCH',
            body: {
                name: namePerson,
                about: informPerson
            },
            contentType: 'application/json'
          });

          editProfile.editProfile(userInfo, popupEditProfileForm);  
}});

/**
 * Заполнение формы редактирования пользователя
 */
const fillingOutEditProfileForm = () => {
    const {name, info} = userInfo.getUserInfo();

    inputNamePopupEditProfile.value = name;
    inputInfoPopupEditProfile.value = info;

    validateFormEditProfile.validateForm();
    popupEditProfileForm.open();
}

popupEditProfileForm.setEventListeners();

const list = new Section({renderer: (item) => {
    const card = new Card(item, templateCard, pageElements, IDENTIFIER_USER, Api, {
        handleCardClick: (src, name) => {
            createPopupViewPhoto.open(src, name);
        }},
        {
        handleDeleteCardClick: (deleteCard) => {
            popupDeleteCard.open();
            popupDeleteCard.setEventListeners(deleteCard, popupDeleteCard);
        }}
     );

    const cardElement = card.getCard();
    list.addItem(cardElement);
}}, pageElements.sectionElements);

const popupAddCard = new PopupWithForm(
    pageElements.popupAddCard, 
    pageElements.buttonClosePopup,
    pageElements.buttonSavePopupAddCard, {
    handleFormSubmit: (evt) =>{
        const addCard = new Api({
            baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/cards',
            method: 'POST',
            body: {
                name: popupAddCardInputName.value,
                link: popupAddCardInputLink.value
            },
            contentType: 'application/json'
          });

          addCard.addCard(list, popupAddCard);  
}});

popupAddCard.setEventListeners();

const openPopupAddCard = () => {
    validateFormAddCard.deleteError();
    popupAddCard.open();
}

const openPopupEditAvatar = () => {
    validateFormEditAvatar.deleteError();
    createPopupEditAvatar.open();
}

const getCards = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/cards'
  });
getCards.getCards(list);  

const getUserInfo = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/users/me'
  });
getUserInfo.getUserInfo(userInfo);

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupEditAvatar.addEventListener('click', openPopupEditAvatar);
