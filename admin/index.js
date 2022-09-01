const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '576291',
  database: 'APIGestao_de_Produtos',
  port: 3306
});

// Check connection database
db.connect(err => {
  if (err) { console.log(err); }
  console.log("Database connect")
});

// Get data
app.get('/produtos', (req, res) => {
  let query = 'select * from Produtos;'
  db.query(query, (err, result) => {
    if (err) { console.log(err, 'ERROR'); }
    if (result) {
      res.send({
        message: 'Show all data of table Produtos',
        data: result
      });
    }
  });
});

app.use(cors());
app.use(bodyparser.json());
app.listen(3000, () => {
  console.log("Server running...");
});
