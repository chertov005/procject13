const express = require('express') ;
const router = express.Router() ;
const {UsersModel,validLogin,validUsers} = require('../DataBase/model/usersModel');
const {genToken, authToken} = require('../AuthToken/authTokem');
const bcrypt = require('bcrypt');




router.get('/' , async(req , res) => {

    try {
        
        return res.status(200) .json({message:'route users 200 ok'});

    } catch (error) {
        return res.status(500) .json({message:'internal server error'});
    }
    
});


router.post('/' , async(req , res) =>{ 

    let valid = validUsers(req.body);
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    }
    
    try {
        
        let data = new UsersModel(req.body)
        data.password = await bcrypt.hash(data.password , 10)
        await data.save()
        return res.status(201) .json(data)



    } catch (error) {
        
        return res.status(500) .json({message:'internal server error'});
    }
    
    
});





router.delete('/:id' , async(req , res) => {




    
    try {
        

        let data = await UsersModel.deleteOne({_id:req.params.id});
        return res.json(data);




    } catch (error) {
        
        return res.status(500) .json({message:'internal server error'});
    }
    
    
});








router.put('/:id' , async(req , res) => {


    let valid = validUsers(req.body);
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    }

    
    try {
        

        let data = await UsersModel.updateOne({_id:req.params.id});
        return res.json(data);




    } catch (error) {
        
        return res.status(500) .json({message:'internal server error'});
    }
    
    
});




router.post('/login' , async(req , res) => {


    let valid = validLogin(req.body);
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    }

    
    
    try {

        let user = await UsersModel.findOne({email:req.body.email}) ;
        if(!user) {
            return res.status(401) .json({message:'wrong user'}) 
        }
        
        
        let passValid = await bcrypt.compare(req.body.password , user.password) ;
        if(!passValid) {
            return res.status(401) .json({message:'wrong password'}) 
        }
        
        let getToken = genToken(user._id ,user.role)
        return res.json({token:getToken})

    } catch (error) {
        return res.status(500) .json({message:'internal server error'});
    }
    
});



router.get('/info' ,authToken, async(req , res) => {
    
    try {
        
        let data = await UsersModel.findOne({_id:req.decodeToken._id})
        res.status(200) .json(data)


    } catch (error) {
        
        return res.status(500) .json({message:'internal server error'});
    }

});


module.exports = router;