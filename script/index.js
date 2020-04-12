const buttonOpenModalEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonCloseModalEditProfileInfo = document.querySelector('.popup__icon');
const buttonSaveDataProfile = document.querySelector('.popup__save-button');


const closeModalEditProfileInfo = function(){
    document.querySelector('.popup').classList.remove('popup_opened');
};

const saveDataProfile = function(){
    const popupField = document.querySelectorAll('.popup__field');
    const name = popupField[0].value;
    const informPerson = popupField[1].value;

    const namePage = document.querySelector('.profile-info__name');
    const informPage = document.querySelector('.profile-info__information-person');
    
    namePage.textContent = name;
    informPage.textContent = informPerson;
    
    closeModalEditProfileInfo();
}

buttonCloseModalEditProfileInfo.addEventListener('click', closeModalEditProfileInfo);
buttonSaveDataProfile.addEventListener('click', saveDataProfile);

document.addEventListener('keypress', function(e){
    const activPopup = document.querySelector('.popup_opened');
    if(e.key === 'Enter' && activPopup !== null){
        saveDataProfile();
    }
});


buttonOpenModalEditProfileInfo.addEventListener('click', function(){
    const name = document.querySelector('.profile-info__name');
    const informPerson = document.querySelector('.profile-info__information-person');
    let popupField = document.querySelectorAll('.popup__field');

    popupField[0].value = name.textContent;
    popupField[1].value = informPerson.textContent;

    document.querySelector('.popup').classList.add('popup_opened');
});