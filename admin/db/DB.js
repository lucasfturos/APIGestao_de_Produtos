const mysql = require('mysql2');
require('dotenv').config();

const hostname = process.env.DB_HOST,
  username = process.env.DB_USERNAME,
  password = process.env.DB_PASSWORD,
  database_name = process.env.DB_DATABASE,
  port = process.env.DB_PORT;

// Database connection
const db = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: database_name,
  port: parseInt(port)
});

// Check connection database
db.connect(err => {
  err ? console.log(err) : console.log("Database connect")
});
module.exports = db;
