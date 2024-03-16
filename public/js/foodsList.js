window.addEventListener('load' , async() => {

    doApiList();
    declareViewEvent();


});



const doApiList = async() => {


    try {
        let url = 'http://127.0.0.1:3001/foods'
        fetch(url , {
            method:'GET' ,
            headers:{'content-type':'application/json' , 'x-api-key':localStorage.user}
        })
        .then(resp => resp.json())
        .then(data => {
    
            console.log(data)
            arrayList(data)
    
        });
    } catch (error) {
        return console.log('there some problem , try later agin')
    }

};







const doPostObj = async(_body) => {

    let url = 'http://127.0.0.1:3001/foods' ;
    
    let resp = await fetch(url,{
        method:'POST' ,
        body:JSON.stringify(_body) ,
        headers:{'content-type':'application/json' , 'x-api-key':localStorage.user }
    })
    let data = await resp.json()

    

    if(data._id) {
        doApiList()
    }

};




const doDeleteApi = async(_id) => {


    let url = `http://127.0.0.1:3001/foods/${_id} `;

    fetch(url , {
        method:'DELETE',
        headers:{'content-type':'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {

        

        if(data.message) {
            doApiList()
        }
    })



};








/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const arrayList = async(_array) => {

    document.querySelector('#id_ul').innerHTML = '';

    for(let i = 0 ; i < _array.length; i++) {

        console.log(i)

        let item = _array[i]
        
        console.log(item);

        let li = document.createElement('li') ;
        li.className ='list-group-item' ;
        document.querySelector('#id_ul').append(li)

        li.innerHTML += `<button class="btn btn-dark btnD">x</button> name: ${item.name} , price:${item.price}  nis`

        let btnD = li.querySelector('.btnD') ;
        btnD.addEventListener('click' , async() => {

            if(confirm(`delete ${item.name} ?`)) {
                doDeleteApi(item._id)
              
            }

        });





    };

};






const declareViewEvent = async () => {

    document.querySelector('#id_form').addEventListener('submit' , async(e) => {


        e.preventDefault();

        let obj = {

            name:document.querySelector('#id_name').value ,
            cals:document.querySelector('#id_cals').value ,
            price:document.querySelector('#id_price').value ,
            img_url:document.querySelector('#id_img_url').value ,
            category_id:document.querySelector('#id_category_id').value 

        }

        console.log(obj);

        doPostObj(obj)


    });

};