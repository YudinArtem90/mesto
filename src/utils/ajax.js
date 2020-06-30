const ajax = (url, method = "GET", body, contentType) => {

    console.log('ajax');

    const data = {
        method: method,
        headers: {
            authorization: 'f77ffc2a-fabb-4e1a-b96f-391d240718e4'
        }
    };

    if(body){
        data.body = JSON.stringify(body);
    }

    if(contentType){
        data['headers']['Content-Type'] = contentType;
    }

    return new Promise(function(resolve) {
        fetch(url, data)
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            })
        .then((result) => {
            console.log('result', result);
            let j = result;
            // if(url === 'https://mesto.nomoreparties.co/v1/cohort-12/cards'){
            //  j = result.slice(1, 3);
            // }
            // let j = result.slice(1, 3);
            // console.log(j);
            resolve(j);
        })
        .catch((error) => console.log(error))
        .finally((result) => console.log(result))
    })
}

export default ajax;