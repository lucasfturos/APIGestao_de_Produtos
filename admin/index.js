const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
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

// Get all data
app.get('/', (req, res) => {
  let query = 'select * from Produtos'

  db.query(query, (err, result) => {
    result ? res.send({
        message: 'Listar todos os dados',
        data: result
      }) : err ? 0 : console.log('ERROR',err);
  });
});

// Get single data

app.get('/:cod_bar', (req, res) => {
  let getCodBar = req.params.cod_bar;
  let query = `select * from Produtos where cod_bar = ${getCodBar}`;

  db.query(query, (err, result) => {
    err ? 0 : console.log('ERROR', err);

    result.length > 0 ? res.send({
      message: 'Busca efetuada com sucesso',
      data: result
    }) : res.send({
      message: 'O código de barras não existe'
    });
  });
});

// Create data

app.post('/create', (req, res) => {
  let setCodBar = req.body.cod_bar,
    setNome = req.body.nome,
    setDescricao = req.body.descricao,
    setQuantidade = req.body.quantidade,
    setPreco = req.body.preco;

  let query = `insert into Produtos (cod_bar, nome, descricao, quantidade, preco) value
    ('${setCodBar}','${setNome}','${setDescricao}','${setQuantidade}','${setPreco}')`;

  db.query(query, (err, result) => {
    err ? 0 : console.log('ERROR', err);
    console.log('Dados inseridos', result);
    res.send({
      message: 'Cadastro de produto efetuado com sucesso',
    });
  });
});

// Update data

app.put('/:cod_bar', (req, res) => {
  let setCodBar = req.body.cod_bar,
    setNome = req.body.nome,
    setDescricao = req.body.descricao,
    setQuantidade = req.body.quantidade,
    setPreco = req.body.preco;
  let query = `update Produtos set
    cod_bar = '${setCodBar}',
    nome = '${setNome}',
    descricao = '${setDescricao}',
    quantidade = '${setQuantidade}',
    preco = '${setPreco}' where cod_bar = ${setCodBar}`;

  db.query(query, (result, err) => {
    err ? 0 : console.log('ERROR', err);
    res.send({
      message: 'Atualização do produto foi efetuada com sucesso',
    });
  });
});

// Delete single data

app.delete('/:cod_bar', (req, res) => {
  let getCodBar = req.params.cod_bar;
  let query = `delete from Produtos where cod_bar = ${getCodBar}`;
  db.query(query, (result, err) => {
    err ? 0: console.log('ERROR', err);
    res.send({
      message: 'Produto foi excluído com sucesso',
    });
  });
});

app.use(cors());
app.use(bodyparser.json());
app.listen(3000, () => {
  console.log("Server running...");
});
