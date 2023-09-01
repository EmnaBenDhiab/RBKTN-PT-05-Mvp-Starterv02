const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : '3306',
  user     : 'root',
  password : 'root',
  database : 'mvp'
});

module.exports = connection;