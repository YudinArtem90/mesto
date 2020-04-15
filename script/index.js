const buttonOpenModalEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonCloseModalEditProfileInfo = document.querySelector('.popup__icon');
const buttonSaveDataProfile = document.querySelector('.popup__save-button');
const informPage = document.querySelector('.profile-info__information-person');
const activPopup = document.querySelector('.popup_opened');
const namePage = document.querySelector('.profile-info__name');
const popup = document.querySelector('.popup');
const popupField = document.querySelectorAll('.popup__field');


const closeModalEditProfileInfo = function(){
    popup.classList.remove('popup_opened');
};

const saveDataProfile = function(e){
    e.preventDefault();
    const name = popupField[0].value;
    const informPerson = popupField[1].value;
    
    namePage.textContent = name;
    informPage.textContent = informPerson;
    
    closeModalEditProfileInfo();
}

buttonCloseModalEditProfileInfo.addEventListener('click', closeModalEditProfileInfo);
buttonSaveDataProfile.addEventListener('click', saveDataProfile);

buttonOpenModalEditProfileInfo.addEventListener('click', function(){

    popupField[0].value = namePage.textContent;
    popupField[1].value = informPage.textContent;

    popup.classList.add('popup_opened');
});