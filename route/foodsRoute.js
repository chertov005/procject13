const express = require('express') ;
const router = express.Router() ;
const {FoodsModel,validFoods} = require('../DataBase/model/foodsModel');
const {authToken} = require('../AuthToken/authTokem')


router.get('/' ,authToken, async(req , res) => {

    try {
        
        let data ;

        if(req.decodeToken.role == 'admin') {

            data = await FoodsModel.find({})
            res.status(200) .json(data)
        }

        else {
            data = await FoodsModel.find({user_id:req.decodeToken._id}) 
            return res.status(200) .json(data)
        }
    
        


    } catch (error) {
        return res.status(500) .json({message:'internal server error'});
    }
    
    
});


router.post('/' ,authToken, async(req , res) => {

    let valid = validFoods(req.body);
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    }

    
    try {

        let data = new FoodsModel(req.body);
        data.user_id = req.decodeToken._id
        await data.save();
        return res.status(201) .json(data)

        
    } catch (error) {
        return res.status(500) .json({message:'internal server error'});
    }
    
});




router.delete('/:id' ,authToken, async(req , res) => {
    
    try {
        

        let data ;

        if(req.decodeToken.role == 'admin') {
            data = await FoodsModel.deleteOne({_id:req.params.id})
            res.json(data)
        }

        else{

            data = await FoodsModel.deleteOne({_id:req.params.id , user_id:req.decodeToken._id}) ;
            return res.json(data)
        }


    } catch (error) {
        return res.status(500) .json({message:'internal server error'});
        
    }
    
});



router.put('/:id' ,authToken, async(req , res) => {
    
    let valid = validFoods(req.body);
    if(valid.error) {
        return res.status(400) .json(valid.error.details)
    }
    
    
    try {
        
        let data ;

        if(req.decodeToken.role == 'admin') {

            data = await FoodsModel.updateOne({_id:req.params.id ,user_id:req.decodeToken._id})
            return res.json(data)

        }

        else{

            data = await FoodsModel.updateOne({_id:req.params.id})

        }


    } catch (error) {
        return res.status(500) .json({message:'internal server error'});
    }
    

});





module.exports = router;