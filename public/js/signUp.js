window.addEventListener('load' , async() => {

    declareViewEvent()

});







const doApiPost = async(_body) => {


    let url = 'http://127.0.0.1:3001/users';

    let resp =  await fetch(url, {
        method:'POST' ,
        body:JSON.stringify(_body) ,
        headers:{'content-type':'application/json'}
    })
    let data = await resp.json()

    console.log(data)

    if(data._id){
        window.location.href = '/html/login.html'
    }

    else {
        alert('wrong')
    }


};



const declareViewEvent = async() => {

    document.querySelector('#id_form').addEventListener('submit' , (e) => {

        e.preventDefault() ;

        let obj = {

            name:document.querySelector('#id_name').value ,
            email:document.querySelector('#id_email').value ,
            password:document.querySelector('#id_password').value 

        };

        console.log(obj);

        doApiPost(obj)

    });

};