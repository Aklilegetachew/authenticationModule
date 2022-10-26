const mysql = require("mysql2");

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'authentication',
//     password: ''
// })

const pool = mysql.createPool({
  host: "localhost",
  user: "versavvy_auth",
  database: "versavvy_authentication",
  password: "D,6@4AIZR[eg",
});

module.exports = pool.promise();

// D,6@4AIZR[eg
// versavvy_auth
