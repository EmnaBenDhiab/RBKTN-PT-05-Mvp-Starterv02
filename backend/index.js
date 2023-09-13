'use strict';
// impoort modules here
require('dotenv').config();
const express = require('express'); //FWramework for building rest api routes
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db.js'); // missing import db file
const app = express();

app.use(cors()); // authorize frontend application to access to the rest api routes
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' })); //config body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json()); // use express json response
app.use(cookieParser());

// CAll DB COnnection
 app.get('/', function (err) {
    if (err) throw err;
    res.send('DB Connected ...', db);
});
 
//authorize methods
app.all('*', (req, res, next) => {

    req.header("Authorization");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization ,Accept');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Call routes
app.use('/authentication', require('./routes/AuthRoutes.js'));

app.listen(process.env.PORT, (req, res) => {
    console.log('Backend Server is running on Port', process.env.PORT);
})

module.exports = app;