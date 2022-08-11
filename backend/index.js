const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/oi', function (req, res) {
  res.send('Heberson Vinhote');
});


//o back end armazena as pontuações das jogadas
// criar a lista com a pontuação

const lista = [
  {
    id: 1,
    nome: "Heberson",
    pontos: 90
  },
  
  {
    id: 2,
    nome: "Fabiana",
    pontos: 45
  },
  {
    id: 3,
    nome: "Loki",
    pontos: 47
  },
  
];

//endpoint READ ALL - [GET] /pontuacoes

app.get("/pontuacoes", function (req, res) {
  res.send(lista);
});

//endpoint de CREATE - [POST] /pontuacoes

app.listen(3000)
