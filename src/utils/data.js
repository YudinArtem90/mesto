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


const pageElements = {
    form : '.popup__container',
    inputForm: '.popup__field',
    buttonSaveForm: '.popup__save-button',
    popupEditProfile : '#popupEditProfile',
    popupAddCard: '#popupAddCard',
    popupViewPhoto: '#popupViewPhoto',
    spanForm : '.popup__field-error',
    formEditProfile: '.popup__container_edit-profile',
    formCardAdd: '.popup__container_add-card',
    sectionElements: '.elements',
    inputNamePopupEditProfile: '.popup__field_name_person',
    inputInfoPopupEditProfile: '.popup__field_inform_person',
    buttonOpenPopupAddCard: '.profile__add-button',
    buttonClosePopupViewPhoto: '.popup__icon-close-view-photo',
    buttonOpenPopupEditProfileInfo: '.profile-info__edit-button',
    namePage: '.profile-info__name',
    informPage: '.profile-info__information-person',
    containerPopupViewPhoto: '.popup__view-photo-container',
    infoPopupViewPhoto: '.popup__view-photo-info',
    templateCard: '#card'
  }

  export {initialCards, pageElements};