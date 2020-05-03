const sectionElements = document.querySelector('.elements');

/**
 * Popups 
 */

 const popupEditProfile = document.querySelector('#popupEditProfile');
 const popupAddCard = document.querySelector('#popupAddCard');
 const popupViewPhoto = document.querySelector('#popupViewPhoto');

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
const inputNamePopupAddCard = document.querySelector('.popup__field_name_card');
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

const deleteCard = (card, buttonCardLike, image) => {
    buttonCardLike.removeEventListener('click', addLikeOrDislikeCard);
    image.removeEventListener('click', createPopupViewPhoto);
    card.remove();
}

const addLikeOrDislikeCard = (event) => {
    event.target.classList.toggle("element__button-like_action");
}

/**
 * Общий метод закрытия и открытия модалки 
 */
const openAndClosePopup = (popup) => {
    popup.classList.toggle("popup_opened");
}

const createPopupViewPhoto = (event) => {
    const name = event.target.alt;
    containerPopupViewPhoto.src = event.target.currentSrc; 
    containerPopupViewPhoto.setAttribute('alt', `Фото - ${name}`);
    infoPopupViewPhoto.textContent = name;
    openAndClosePopup(popupViewPhoto);
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
const fillingOutEditProfileForm = () => {
    inputNamePopupEditProfile.value = namePage.textContent;
    inputInfoPopupEditProfile.value = informPage.textContent;
    openAndClosePopup(popupEditProfile);
}

const editProfile = (event) => {
    event.preventDefault();
    namePage.textContent = inputNamePopupEditProfile.value;
    informPage.textContent = inputInfoPopupEditProfile.value;
    openAndClosePopup(popupEditProfile);
}

const addCard = (name, link) => {
    const card = createTemplateCard(name, link);
    sectionElements.prepend(card);
}

/**
 * Добавление карточки
 */
const addOneCard = (event) => {
    event.preventDefault()
    addCard(popupAddCardInputName.value, popupAddCardInputLink.value);
    formCardAdd.reset();
    openAndClosePopup(popupAddCard);
}

const initialAddingCards = () => {
    initialCards.forEach((data) => {
        addCard(data.name, data.link);
    });
}

/**
 * Динамическое добавление карточек
 */
initialAddingCards();

/**
 * закрытия модальных окон
 */
buttonClosePopupViewPhoto.addEventListener('click', (event) => openAndClosePopup(popupViewPhoto));
buttonClosePopupFormEditProfile.addEventListener('click', (event) => openAndClosePopup(popupEditProfile));
buttonClosePopupFormCardAdd.addEventListener('click', (event) => openAndClosePopup(popupAddCard));

buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupAddCard.addEventListener('click', () => openAndClosePopup(popupAddCard));

buttonSavePopupEditProfile.addEventListener('click', editProfile);
buttonSavePopupAddCard.addEventListener('click', addOneCard);