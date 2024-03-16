window.addEventListener('load' , async() => {

    doApiGet()

});



const doApiGet = async() => {

    let url = 'http://127.0.0.1:3001/users/info' ;

    let resp = await fetch(url , {
        method:'GET' ,
        headers:{

            'content-type':'application/json' ,
            'x-api-key':localStorage['user']

        }
    })
    let data =  await resp.json()

    console.log(data)


    document.querySelector('#id_name').innerHTML = `${data.name}`
    document.querySelector('#id_email').innerHTML = `${data.email}`
    document.querySelector('#id_type').innerHTML = `${data.user_type}`
    document.querySelector('#id_date').innerHTML = `${data.date_created}`


};

