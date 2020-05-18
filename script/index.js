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
const formEditProfile = document.querySelector('.popup__container_edit-profile');
const formCardAdd = document.querySelector('.popup__container_add-card');

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

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Румыния',
        link: 'https://images.unsplash.com/photo-1587974038774-40e60a5f9669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Исландия',
        link: 'https://images.unsplash.com/photo-1553693417-c8cfd96d0307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE3MzYxfQ&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addLikeOrDislikeCard = (event) => {
    event.target.classList.toggle("element__button-like_action");
}

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

const createPopupViewPhoto = (event) => {
    const name = event.target.alt;
    containerPopupViewPhoto.src = event.target.currentSrc; 
    containerPopupViewPhoto.setAttribute('alt', `Фото - ${name}`);
    infoPopupViewPhoto.textContent = name;
    openAndClosePopup(popupViewPhoto, event);
}

const deleteCard = (card, buttonCardLike, image) => {
    buttonCardLike.removeEventListener('click', addLikeOrDislikeCard);
    image.removeEventListener('click', createPopupViewPhoto);
    card.remove();
}

/**
 *  Создания шаблона карточек
 */
const createTemplateCard = (name, link) => {
    const template = templateCard.firstElementChild.cloneNode(true);
    const buttonDeleteCard = template.querySelector('.element__button-delete');
    const buttonCardLike = template.querySelector('.element__button-like');
    const image =  template.querySelector('.element__image');
    const text = template.querySelector('.element__text');

    image.src = link;
    image.setAttribute('alt', name);
    text.textContent = name;
    
    buttonCardLike.addEventListener('click', addLikeOrDislikeCard);
    image.addEventListener('click', createPopupViewPhoto);
    buttonDeleteCard.addEventListener('click', () => deleteCard(template, buttonCardLike, image), {onсe : true});
    return template;
}

/**
 * Заполнение формы редактирования пользователя
 */
const fillingOutEditProfileForm = (event) => {
    inputNamePopupEditProfile.value = namePage.textContent;
    inputInfoPopupEditProfile.value = informPage.textContent;
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

const addCard = (name, link) => {
    const card = createTemplateCard(name, link);
    sectionElements.prepend(card);
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
        addCard(data.name, data.link);
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

const addEventListenerClickPopup = () => {
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

addEventListenerClickPopup();

