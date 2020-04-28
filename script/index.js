const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

let namePage = document.querySelector('.profile-info__name');
let informPage = document.querySelector('.profile-info__information-person');
const popupViewPhoto = document.querySelector('.popup-view-photo');

/**
 * Кнопки 
 */
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const buttonOpenPopupEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonClosePopupViewPhoto = document.querySelector('.popup-view-photo__close-popup');


const popupForm = document.querySelector('#popupForm').content;
const sectionElements = document.querySelector('.elements');
const templateCard = document.querySelector('#card').content;

/**
 * Модальное окно просмотра фото
 */
const containerPopupViewPhoto = document.querySelector('.popup-view-photo__container');
const infoPopupViewPhoto = document.querySelector('.popup-view-photo__info');

/**
 * Для модального окна добавления карточек
 */
const popupAddCardInputName = document.createElement('input'); 
const popupAddCardInputLink = document.createElement('input'); 
const popupAddCardButtonSave = document.createElement('button');

const cloneTemplateAddCard = popupForm.cloneNode(true);
const popupAddCard = cloneTemplateAddCard.querySelector('.popup');
const buttonClosePopupAddCard = cloneTemplateAddCard.querySelector('.popup__icon');

/**
 * Для модального окна редактирования профиля
 */
const popupEditProfileInputName = document.createElement('input'); 
const popupEditProfileInputInformPersonal = document.createElement('input'); 
const popupEditProfileButtonSave = document.createElement('button');

const cloneTemplateEditProfile = popupForm.cloneNode(true);
const popupEditProfile = cloneTemplateEditProfile.querySelector('.popup');
const buttonCloseModalEditProfile = cloneTemplateEditProfile.querySelector('.popup__icon');

const deleteCard = (event) => {
    const parentElement = event.target.parentElement;
    parentElement.remove();
}

const addLikeOrDislikeCard = (event) => {
    event.target.classList.toggle("element__button-like_action");
}

const closeViewPhoto = (event) => {
    popupViewPhoto.classList.toggle("popup-view-photo_opened");
}

const openViewPhoto = (event) => {
    popupViewPhoto.classList.toggle("popup-view-photo_opened");
}

const addCard = (name, link) => {
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

const createPopupViewPhoto = (link, name) => {
    containerPopupViewPhoto.style.backgroundImage = `url(${link})`;
    infoPopupViewPhoto.textContent = name;
    openViewPhoto();
}

initialCards.forEach((data) => {
    const card = addCard(data.name, data.link);

    sectionElements.append(card);
});

const openPopupAddCard = () => {
    popupAddCard.classList.add('popup_opened');
}

const closePopupAddCard = () => {
    popupAddCard.classList.remove('popup_opened');
}

const openPopupEditProfile = () => {
    popupEditProfile.classList.add('popup_opened');
}

const closePopupEditProfile = () => {
    popupEditProfile.classList.remove('popup_opened');
}

const saveDataProfile = (e) =>{
    e.preventDefault();
    
    namePage.textContent = popupEditProfileInputName.value;
    informPage.textContent = popupEditProfileInputInformPersonal.value;
    
    closePopupEditProfile();
}

const createPopupAddCard = function(){
    const popupTitle = cloneTemplateAddCard.querySelector('.popup__title');
    const popupHeader = cloneTemplateAddCard.querySelector('.popup__header');

    popupHeader.after(popupAddCardInputName, popupAddCardInputLink, popupAddCardButtonSave);

    popupTitle.textContent = 'Новое место';

    popupAddCardButtonSave.textContent = 'Создать';
    popupAddCardButtonSave.classList.add('popup__save-button');
    popupAddCardButtonSave.setAttribute('type', 'submit');

    popupAddCardInputName.classList.add('popup__field');
    popupAddCardInputName.setAttribute('placeholder', 'Название');
    popupAddCardInputName.setAttribute('name', 'name');

    popupAddCardInputLink.classList.add('popup__field');
    popupAddCardInputLink.setAttribute('placeholder', 'Ссылка на картинку')
    popupAddCardInputLink.setAttribute('name', 'link');

    sectionElements.append(cloneTemplateAddCard);
};

const createPopupEditProfileInfo = function(){
    const popupTitle = cloneTemplateEditProfile.querySelector('.popup__title');
    const popupHeader = cloneTemplateEditProfile.querySelector('.popup__header');

    popupHeader.after(popupEditProfileInputName, popupEditProfileInputInformPersonal, popupEditProfileButtonSave);

    popupTitle.textContent = 'Редактировать профиль';

    popupEditProfileButtonSave.textContent = 'Сохранить';
    popupEditProfileButtonSave.classList.add('popup__save-button');
    popupEditProfileButtonSave.setAttribute('type', 'submit');

    popupEditProfileInputName.classList.add('popup__field');
    popupEditProfileInputName.value = namePage.textContent;
    popupEditProfileInputName.setAttribute('name', 'name');

    popupEditProfileInputInformPersonal.classList.add('popup__field');
    popupEditProfileInputInformPersonal.value = informPage.textContent;
    popupEditProfileInputInformPersonal.setAttribute('name', 'link');

    sectionElements.append(cloneTemplateEditProfile);
};

/**
 * Добавление карточки
 */
const addOneCard = (event) => {
    event.preventDefault()
    const card = addCard(popupAddCardInputName.value, popupAddCardInputLink.value);
    sectionElements.prepend(card);
    popupAddCardInputName.value = '';
    popupAddCardInputLink.value = '';
    closePopupAddCard();
}



buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

buttonOpenPopupEditProfileInfo.addEventListener('click', openPopupEditProfile);
buttonCloseModalEditProfile.addEventListener('click', closePopupEditProfile);
popupEditProfileButtonSave.addEventListener('click', saveDataProfile);

popupAddCardButtonSave.addEventListener('click', addOneCard);
buttonClosePopupViewPhoto.addEventListener('click', closeViewPhoto);
createPopupAddCard();
createPopupEditProfileInfo();