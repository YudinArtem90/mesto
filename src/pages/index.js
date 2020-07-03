import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {pageElements} from '../utils/data.js';
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

// Идентификатор пользователя
let identifierUser = '';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    groupId: 'cohort-12',
    authorization: 'f77ffc2a-fabb-4e1a-b96f-391d240718e4'
  });

const createPopupEditAvatar = new PopupWithForm(
    pageElements.popupEditAvatar, 
    pageElements, {
    handleFormSubmit: ({linkCard}) =>{
        api.getData({
            method: 'PATCH',
            body: { avatar: linkCard},
            contentType: 'application/json'
        }, 'users/me/avatar')
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
    pageElements, {
    handleFormSubmit: (data) =>{
        const {informPerson, namePerson} = data;
        api.getData({
            method: 'PATCH',
            body: { 
                name: namePerson,
                about: informPerson
            },
            contentType: 'application/json'
        }, 'users/me')
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
    const card = new Card(item, templateCard, pageElements, identifierUser, api, {
        handleCardClick: (src, name) => {
            createPopupViewPhoto.open(src, name);
        }},
        {
            addLikeOrDislikeCard: (thisCard) => {
                api.getData({
                    method: thisCard._isLike ? 'PUT' : 'DELETE'
                }, `cards/likes/${thisCard._cardId}`)
                    .then((res) => {
                        thisCard._countLike.textContent = res.likes.length;
                        thisCard._buttonCardLike.classList.toggle("element__button-like_action");
                    })
                    .catch((error) => console.log('Ошибка при проставлении или удалении лайка', error));
        
                thisCard._isLike = !thisCard._isLike;
        }},
        {
            openPopupDeleteCard: (thisCard) => {
                popupDeleteCard.open();
                popupDeleteCard.setEventListeners((thisDeleteCard) => {
                        api.getData({
                                method: 'DELETE'
                            }, `cards/likes/${thisCard._cardId}`)
                        .then((res) => {
                            thisCard._element.remove();
                            thisCard._element = null;
                            thisDeleteCard.close();
                        })
                        .catch((error) => console.log('Ошибка при удалении карточки', error));
            });
        }}
     );

    const cardElement = card.getCard();
    list.addItem(cardElement);
}}, pageElements.sectionElements);

const popupAddCard = new PopupWithForm(
    pageElements.popupAddCard, 
    pageElements, {
    handleFormSubmit: (evt) =>{
        api.getData({
            method: 'POST',
            body: { 
            name: popupAddCardInputName.value,
            link: popupAddCardInputLink.value
            },
            contentType: 'application/json'
        }, 'cards')
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
    api.getData({}, 'cards')
        .then((res) => {
            list.renderItems(res);
        })
        .catch((error) => console.log('Ошибка при первичной загрузке карточек', error));
}

const getUserInfo = () => {
    api.getData({}, 'users/me')
        .then((res) => {
            const {avatar, name, about, _id} = res;
            userInfo.setUserInfo(name, about);
            userInfo.setUserAvatar(avatar);
            identifierUser = _id;
            getCards();
        })
        .catch((error) => console.log('Ошибка при первичной загрузке данных пользователя', error));
}

getUserInfo();
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupEditAvatar.addEventListener('click', openPopupEditAvatar);
