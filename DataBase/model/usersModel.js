const mongoose = require('mongoose');
const joi = require('joi');



const schemaUsers = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    role: {type:String , default:'user'} ,
    date_created: { type: Date, default: Date.now() }

}

);


exports.UsersModel = mongoose.model('users', schemaUsers);


exports.validUsers = (req_body) => {

    let schema = joi.object({

        name: joi.string() .min(2) .max(9999) .required(),
        email: joi.string() .min(5) .max(999999) .email() .required(),
        password: joi.string() .min(5) .max(9999) .required()

    });

    return schema.validate(req_body)

};


/////////////////////////////////////////////////////////////////////


exports.validLogin = (req_body) => {

    let schema = joi.object({

      
        email: joi.string() .min(5) .max(999999) .email() .required(),
        password: joi.string() .min(5) .max(9999) .required()

    });

    return schema.validate(req_body)

};