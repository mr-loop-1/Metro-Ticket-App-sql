var mysql = require('mysql2');

var conn = mysql.createConnection({         //createConnection is fixed, con is variable
  host: "localhost",            // CHANGE IF DIFFERENT HOST
  user: "root",                 // CHANGE IF DIFFERENT USER
  password: " ",                // YOUR PASSWORD HERE
  database: "metro3"            // CHANGE IF DATABASE NAME DIFFERENT
});

conn.connect(function(err) {                 //connect is fixed function to connect to con
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn;
