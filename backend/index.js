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
];

//endpoint READ ALL - [GET] /pontuacoes

app.get("/pontuacoes", async function (req, res) {
  const itens = await collection.find().sort({ pontos: -1 }).limit(10).toArray();
  
  res.send(itens);
});

//endpoint de CREATE - [POST] /pontuacoes

app.post("/pontuacoes", async function (req, res) {
  const item = req.body;
  
  // console.log(item);

  //Adicionando o item na lista

//  lista.push({
//    id: lista.length + 1,
//    nome:item.nome,
//    pontos: item.pontos,
//  })
  await collection.insertOne(item);
  res.send(item);
})

app.listen(3000)
}

main();