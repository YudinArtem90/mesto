import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import pageElements from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import ajax from '../utils/ajax';
import './index.css';
import PopupEditAvatar from '../components/PopupEditAvatar.js';

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

const createPopupEditAvatar = new PopupEditAvatar(pageElements, {
    handleFormSubmit: (linkAvatar) =>{
        ajax(
            'https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar', 
            'PATCH',
            {
                avatar: linkAvatar
            },
            'application/json')
            .then((res) => {
                userInfo.setUserAvatar(res.avatar);
            });
            createPopupEditAvatar.close();
    }
});

const popupEditProfileForm = new PopupWithForm(
    pageElements.popupEditProfile, 
    pageElements.buttonClosePopup, {
    handleFormSubmit: (data) =>{
        const {informPerson, namePerson} = data;
        ajax(
            'https://mesto.nomoreparties.co/v1/cohort-12/users/me', 
            'PATCH',
            {
                name: namePerson,
                about: informPerson
            },
            'application/json')
            .then((res) => {
                console.log('getUserInfo');
                
                userInfo.setUserInfo(res.name, res.about);
            });
        popupEditProfileForm.close();
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
    const card = new Card(item, templateCard, pageElements, {ajax}, {
        handleCardClick: (src, name) => {
            createPopupViewPhoto.open(src, name);
        } 
    });
    const cardElement = card.getCard();

    list.addItem(cardElement);
}}, pageElements.sectionElements);

const addOneCard = () => {
    ajax(
        'https://mesto.nomoreparties.co/v1/cohort-12/cards', 
        'POST', {
            name: popupAddCardInputName.value,
            link: popupAddCardInputLink.value
        },
        'application/json')
        .then((res) => {
            console.log('sdfsdfs');
            list.renderItems(res);
        });
}

const popupAddCard = new PopupWithForm(
    pageElements.popupAddCard, 
    pageElements.buttonClosePopup, {
    handleFormSubmit: (evt) =>{
        addOneCard();
        popupAddCard.close();
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
    ajax('https://mesto.nomoreparties.co/v1/cohort-12/cards')
        .then((res) => list.renderItems(res));
}

const getUserInfo = () => {
    ajax('https://mesto.nomoreparties.co/v1/cohort-12/users/me')
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about);
            });
}

getCards();
getUserInfo();

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupEditAvatar.addEventListener('click', openPopupEditAvatar);
