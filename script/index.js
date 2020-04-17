const buttonOpenModalEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonCloseModalEditProfileInfo = document.querySelector('.popup__icon');
const buttonSaveDataProfile = document.querySelector('.popup__save-button');
const activPopup = document.querySelector('.popup_opened');
const popup = document.querySelector('.popup');

let namePerson = document.querySelector('.popup__field_name_person');
let informPerson = document.querySelector('.popup__field_inform_person');


let namePage = document.querySelector('.profile-info__name');
let informPage = document.querySelector('.profile-info__information-person');

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

buttonCloseModalEditProfileInfo.addEventListener('click', closeModalEditProfileInfo);
buttonSaveDataProfile.addEventListener('click', saveDataProfile);

buttonOpenModalEditProfileInfo.addEventListener('click', function(){

    namePerson.value = namePage.textContent;
    informPerson.value = informPage.textContent;

    openModalEditProfileInfo();
});