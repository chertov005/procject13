
const usersR = require('../usersRoute');
const foodsR = require('../foodsRoute');


exports.routeInit = (_app) => {

    _app.use('/users' , usersR);
    _app.use('/foods' ,foodsR);



};