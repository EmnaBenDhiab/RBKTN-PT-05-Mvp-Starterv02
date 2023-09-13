'use strict';
require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password : "",
    database: "pfedatabase",
    //dialect:"mysql",
});

//establish connection
connection.connect(function(err) {
if (err) throw console.log(err);

console.log("Database is running on port", process.env.DB_PORT || 3306 )
});


module.exports = connection;

