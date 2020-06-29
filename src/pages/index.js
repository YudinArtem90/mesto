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

const ajax = (url, method = "GET", body, contentType) => {

    const data = {
        method: method,
        headers: {
            authorization: 'f77ffc2a-fabb-4e1a-b96f-391d240718e4'
        }
    };

    if(body){
        data.body = JSON.stringify(body);
    }

    if(contentType){
        data['headers']['Content-Type'] = contentType;
    }

    return new Promise(function(resolve) {
        fetch(url, data)
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            })
        .then((result) => {
            console.log('result', result);
            let j = result;
            if(url === 'https://mesto.nomoreparties.co/v1/cohort-12/cards'){
             j = result.slice(1, 3);
            }
            // let j = result.slice(1, 3);
            // console.log(j);
            resolve(j);
        })
        .catch((error) => console.log(error))
        .finally((result) => console.log(result))
    })
}

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
    const card = new Card(item, templateCard, {
        handleCardClick: (src, name) => {
            createPopupViewPhoto.open(src, name);
        } 
    });
    const cardElement = card.getCard();

    list.addItem(cardElement);
}}, pageElements.sectionElements);

const addOneCard = () => {
    // const data = [{
    //     name : popupAddCardInputName.value, 
    //     link : popupAddCardInputLink.value
    // }];

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
    // list.renderItems(data);
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
