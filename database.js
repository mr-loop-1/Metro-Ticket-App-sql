var mysql = require('mysql2');

var conn = mysql.createConnection({         //createConnection is fixed, con is variable
  host: "localhost",
  user: "root",
  password: "yesmysql123",
  database: "metro3"
});

conn.connect(function(err) {                 //connect is fixed function to connect to con
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn;