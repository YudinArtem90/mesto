const buttonOpenModalEditProfileInfo = document.querySelector('.profile-info__edit-button');
const buttonCloseModalEditProfileInfo = document.querySelector('.popup__icon');
const saveDataProfile = document.querySelector('.popup__save-button');


const closeModalEditProfileInfo = function(){
    document.querySelector('.popup').classList.remove('popup_opened');
};

buttonCloseModalEditProfileInfo.addEventListener('click', closeModalEditProfileInfo);

buttonOpenModalEditProfileInfo.addEventListener('click', function(){
    const name = document.querySelector('.profile-info__name');
    const informPerson = document.querySelector('.profile-info__information-person');
    let popupField = document.querySelectorAll('.popup__field');

    popupField[0].value = name.textContent;
    popupField[1].value = informPerson.textContent;

    document.querySelector('.popup').classList.add('popup_opened');
});

saveDataProfile.addEventListener('click', function(){
    const popupField = document.querySelectorAll('.popup__field');
    const name = popupField[0].value;
    const informPerson = popupField[1].value;

    const namePage = document.querySelector('.profile-info__name');
    const informPage = document.querySelector('.profile-info__information-person');
    
    namePage.textContent = name;
    informPage.textContent = informPerson;
    
    closeModalEditProfileInfo();
});