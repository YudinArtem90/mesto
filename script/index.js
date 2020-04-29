const sectionElements = document.querySelector('.elements');

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
let inputNamePopupEditProfile = document.querySelector('.popup__field_name_person');
let inputInfoPopupEditProfile = document.querySelector('.popup__field_inform_person');
let inputNamePopupAddCard = document.querySelector('.popup__field_name_card');
let popupAddCardInputName = formCardAdd.querySelector('.popup__field_name_card');
let popupAddCardInputLink = formCardAdd.querySelector('.popup__field_link_card');

/**
 * Данные страницы
 */
let namePage = document.querySelector('.profile-info__name');
let informPage = document.querySelector('.profile-info__information-person');

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

const deleteCard = (event) => {
    const parentElement = event.target.closest('.element');
    parentElement.remove();
}

const addLikeOrDislikeCard = (event) => {
    event.target.classList.toggle("element__button-like_action");
}

/**
 * Общий метод закрытия и открытия модалки 
 */
const openAndClosePopup = (container) => {
    const parentElement = container.closest('.popup');
    parentElement.classList.toggle("popup_opened");
}

const createPopupViewPhoto = (link, name) => {
    containerPopupViewPhoto.style.backgroundImage = `url(${link})`;
    infoPopupViewPhoto.textContent = name;
    openAndClosePopup(containerPopupViewPhoto);
}

/**
 *  Создания шаблона карточек
 */
const createTemplateCard = (name, link) => {
    const template = templateCard.cloneNode(true);
    const buttonDeleteCard = template.querySelector('.element__button-delete');
    const buttonCardLike = template.querySelector('.element__button-like');
    const image =  template.querySelector('.element__image');
    const text = template.querySelector('.element__text');

    image.src = link;
    image.setAttribute('alt', name);
    text.textContent = name;

    buttonDeleteCard.addEventListener('click', deleteCard);
    buttonCardLike.addEventListener('click', addLikeOrDislikeCard);
    image.addEventListener('click', () => createPopupViewPhoto(link, name));

    return template;
}

/**
 * Динамическое добавление карточек
 */
initialCards.forEach((data) => {
    const card = createTemplateCard(data.name, data.link);

    sectionElements.append(card);
});


/**
 * Заполнение формы редактирования пользователя
 */
fillingOutEditProfileForm = () => {
    inputNamePopupEditProfile.value = namePage.textContent;
    inputInfoPopupEditProfile.value = informPage.textContent;
    openAndClosePopup(inputNamePopupEditProfile);
}

editProfile = (event) => {
    event.preventDefault();
    namePage.textContent = inputNamePopupEditProfile.value;
    informPage.textContent = inputInfoPopupEditProfile.value;
    openAndClosePopup(event.target);
}

/**
 * Добавление карточки
 */
const addOneCard = (event) => {
    event.preventDefault()
    const card = createTemplateCard(popupAddCardInputName.value, popupAddCardInputLink.value);
    sectionElements.prepend(card);
    popupAddCardInputName.value = '';
    popupAddCardInputLink.value = '';
    openAndClosePopup(popupAddCardInputName);
}

/**
 * закрытия модальных окон
 */
buttonClosePopupViewPhoto.addEventListener('click', () => openAndClosePopup(event.target));
buttonClosePopupFormEditProfile.addEventListener('click', () => openAndClosePopup(event.target));
buttonClosePopupFormCardAdd.addEventListener('click', () => openAndClosePopup(event.target));

buttonOpenPopupEditProfileInfo.addEventListener('click', fillingOutEditProfileForm);
buttonOpenPopupAddCard.addEventListener('click', () => openAndClosePopup(inputNamePopupAddCard));

buttonSavePopupEditProfile.addEventListener('click', editProfile);
buttonSavePopupAddCard.addEventListener('click', addOneCard);