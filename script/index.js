const buttonOpenModalEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonCloseModalEditProfileInfo = document.querySelector('.popup__icon');
const buttonSaveDataProfile = document.querySelector('.popup__save-button');
const activPopup = document.querySelector('.popup_opened');
const popup = document.querySelector('.popup');
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

let namePerson = document.querySelector('.popup__field_name_person');
let informPerson = document.querySelector('.popup__field_inform_person');


let namePage = document.querySelector('.profile-info__name');
let informPage = document.querySelector('.profile-info__information-person');

const sectionElements = document.querySelector('.elements');
let templateCard = document.querySelector('#card').content;

initialCards.forEach((card) => {
    const cloneTemplate = templateCard.cloneNode(true);
    const image =  cloneTemplate.querySelector('.element__image');
    const text = cloneTemplate.querySelector('.element__text');
    const name = card.name;

    image.src = card.link;
    image.setAttribute('alt', name);
    text.textContent = name;
    sectionElements.append(cloneTemplate);
});

const closeModalEditProfileInfo = function(){
    popup.classList.remove('popup_opened');
};

const openModalEditProfileInfo = function(){
    popup.classList.add('popup_opened');
};

const saveDataProfile = function(e){
    e.preventDefault();

    namePage.textContent = namePerson.value;
    informPage.textContent = informPerson.value;
    
    closeModalEditProfileInfo();
}

const defaultFillingOutFormData = function(){
    namePerson.value = namePage.textContent;
    informPerson.value = informPage.textContent;

    openModalEditProfileInfo();
}

buttonCloseModalEditProfileInfo.addEventListener('click', closeModalEditProfileInfo);
buttonSaveDataProfile.addEventListener('click', saveDataProfile);
buttonOpenModalEditProfileInfo.addEventListener('click', defaultFillingOutFormData);