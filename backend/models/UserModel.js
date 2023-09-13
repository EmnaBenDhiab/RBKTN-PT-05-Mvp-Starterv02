const db = require("../db.js");

const request = "CREATE TABLE IF NOT EXISTS users  (\n" +
    "  id int(11) NOT NULL AUTO_INCREMENT,\n" +
    "  fullname varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
    "  username varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
    "  email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
    "  phonenumber varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
    "  password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
    "  refresh_token TEXT COLLATE utf8mb4_unicode_ci,\n" +
    "  active boolean DEFAULT 1,\n" +
    "  PRIMARY KEY (id),\n" +
    "  UNIQUE KEY email (email)\n" +
    " ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
db.query(request,function(err,result){
    if(err) throw err;
});