import Card from '../components/Card.js';
// import FormValidator from '../components/FormValidator.js';
import {initialCards, pageElements} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
// import UserInfo from '../components/UserInfo.js';
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

const templateCard = document.querySelector(pageElements.templateCard).content;








const addCards = (data, templateCard) => {

    const classList = new Section({data: data, renderer: (item) => {
        console.log('data');
        const classCard = new Card(item, templateCard, {
            handleCardClick: (_this) => {
                const createPopupViewPhoto = new PopupWithImage(
                    _this._image.src,
                    _this._name,
                    pageElements
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

const classPopupAddCard = new PopupWithForm(
    pageElements.popupAddCard, 
    pageElements.buttonClosePopup, {
    handleFormSubmit: (evt) =>{
        addOneCard();
        classPopupAddCard.close();
}});

classPopupAddCard.setEventListeners();

/**
 * Динамическое добавление карточек
 */
addCards(initialCards, templateCard);

buttonOpenPopupAddCard.addEventListener('click', () => classPopupAddCard.open());

export {
    popupViewPhoto , 
    sectionElements, 
    // findSpanError,
    inputNamePopupEditProfile,
    inputInfoPopupEditProfile,
    namePage,
    informPage
};