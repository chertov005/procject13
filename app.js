const http = require('http');
const path = require('path');
const express = require('express') ;
const app = express()
const cors = require('cors');
require('./DataBase/config_mongoose_connect/mongoose_connect');
const {routeInit} = require('./route/config_route/run_routes');

const server = http.createServer(app);

app.use(cors()) ;
app.use(express.json()) ;
app.use(express.static(path.join(__dirname , 'public')));
routeInit(app)

let port = process.env.PORT || 3001 ;

server.listen(port , (err) => {

if(err) {

    return console.log(err)
}

return console.log(`server up , running on port ${port}`)

});