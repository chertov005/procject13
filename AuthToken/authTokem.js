const jwt = require('jsonwebtoken') ; 
const {tokenKey} =  require('../secret/secret') ;




exports.genToken = (_id ,role) => {


    let createToken = jwt.sign({_id ,role} , tokenKey.key , {expiresIn:'60mins'}) ;

    return createToken ;


};





exports.authToken = async(req , resp , next) => {

    let checkTokenHeder = req.header('x-api-key') ;
    if(!checkTokenHeder) {
        return resp.status(401) .json({message:'no token sent in header , please send token '})
    };
    
    
    try {
        
        let decodeToken = jwt.verify(checkTokenHeder , tokenKey.key);

        req.decodeToken = decodeToken ;

        console.log(req.decodeToken)

        next()

    } catch (error) {
        return resp.status(401) .json({message:'token invalid or expired'});
        
    }

    


};