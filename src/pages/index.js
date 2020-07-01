import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {pageElements, IDENTIFIER_USER} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';
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

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    groupId: 'cohort-12',
    authorization: 'f77ffc2a-fabb-4e1a-b96f-391d240718e4'
  });

const createPopupEditAvatar = new PopupWithForm(
    pageElements.popupEditAvatar, 
    pageElements.buttonClosePopup, 
    pageElements.buttonSavePopupEditAvatar, {
    handleFormSubmit: ({linkCard}) =>{
        api.setUrlEditAvatar()
        api.getData({
            method: 'PATCH',
            body: { avatar: linkCard},
            contentType: 'application/json'
        })
        api.getPromise()
            .then((res) => {
            userInfo.setUserAvatar(res.avatar);
            createPopupEditAvatar.close();
            createPopupEditAvatar.removeLoader('Сохранить');
            })
            .catch((error) => console.log('Ошибка при редактировании аватара', error));
    }
});

createPopupEditAvatar.setEventListeners();

const popupEditProfileForm = new PopupWithForm(
    pageElements.popupEditProfile, 
    pageElements.buttonClosePopup,
    pageElements.buttonSavePopupEditProfile, {
    handleFormSubmit: (data) =>{
        const {informPerson, namePerson} = data;

        api.setUrlEditProfile()
        api.getData({
            method: 'PATCH',
            body: { 
                name: namePerson,
                about: informPerson
            },
            contentType: 'application/json'
        })
        api.getPromise()
            .then((res) => {
                const {name, about} = res;
                userInfo.setUserInfo(name, about);
                popupEditProfileForm.close();
                popupEditProfileForm.removeLoader('Сохранить');
            })
            .catch((error) => console.log('Ошибка при редактировании профиля', error));
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
    const card = new Card(item, templateCard, pageElements, IDENTIFIER_USER, api, {
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
        api.setUrlGetCards()
        api.getData({
            method: 'POST',
            body: { 
            name: popupAddCardInputName.value,
            link: popupAddCardInputLink.value
            },
            contentType: 'application/json'
        })
        api.getPromise()
            .then((res) => {
            list.renderItems([res]);
            popupAddCard.close();
            popupAddCard.removeLoader('Создать');
            })
            .catch((error) => console.log('Ошибка при добавлении карточки', error));
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


const getCards = () => {
        api.setUrlGetCards()
        api.getData({})
        api.getPromise()
            .then((res) => {
                list.renderItems(res);
            })
            .catch((error) => console.log('Ошибка при первичной загрузке карточек', error));
}

const getUserInfo = () => {
    api.setUrlEditProfile()
    api.getData({})
    api.getPromise()
        .then((res) => {
            const {avatar, name, about} = res;
            userInfo.setUserInfo(name, about);
            userInfo.setUserAvatar(avatar);
        })
        .catch((error) => console.log('Ошибка при первичной загрузке данных пользователя', error));
}

getCards();
getUserInfo();
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupEditAvatar.addEventListener('click', openPopupEditAvatar);
