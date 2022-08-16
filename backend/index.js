const express = require('express')
const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const dbname = "jornada-fullstack-ocean"

async function main() {

console.log("conectando ao banco de dados")
const client = await MongoClient.connect(url);
const db = client.db(dbname);
const collection = db.collection("pontuacoes")

console.log("Banco de dados conectados")
const app = express()

//Sinalizando para o express que estamos usando JSON no body das requisições

app.use(express.json());

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

app.get("/pontuacoes", async function (req, res) {
  const itens = await collection.find().toArray();
  res.send(itens);
});

//endpoint de CREATE - [POST] /pontuacoes

app.post("/pontuacoes", function (req, res) {
  const item = req.body;
  
  // console.log(item);

  //Adicionando o item na lista

  lista.push({
    id: lista.length + 1,
    nome:item.nome,
    pontos: item.pontos,
  })
  res.send("Item criado com sucesso");
})

app.listen(3000)
}

main();