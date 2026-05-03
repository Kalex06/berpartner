const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "berpartner",
    charset: 'utf8mb4',
    multipleStatements: true 
});

module.exports = pool;


