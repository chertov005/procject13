const {tokenKey} = require('../../secret/secret')

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${tokenKey.db_name}:${tokenKey.db_password}@cluster.w5tvj76.mongodb.net/DataBaseStore`)
  .then(() => console.log('Connected DataBaseStore'));

  
