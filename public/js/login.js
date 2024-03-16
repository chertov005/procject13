window.addEventListener('load' , async() => {

  declareViewEvent()

});



const doPost = async(_body) => {

  let url = `http://127.0.0.1:3001/users/login` 
  fetch(url ,{
    method:'POST',
    body:JSON.stringify(_body) ,
    headers:{'content-type':'application/json'}
  })
  .then(resp => resp.json())
  .then(data => {

    console.log(data)

    if(data.myToken) {

      localStorage.setItem('user' , data.myToken)

    }

  });

};



const declareViewEvent = async() => {


  document.querySelector('#id_form').addEventListener('submit' , async(e) => {

    e.preventDefault()


    let obj = {
      
      email:document.querySelector('#id_email').value ,
      password:document.querySelector('#id_password').value 

    };



    doPost(obj);



  });


};