const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();

const dbUrl =
  "mongodb+srv://admin:inf5ZHK7HyeDrt9h@cluster0.kvp4sku.mongodb.net";

const dbName = "ocean-jornada-backend";

const client = new MongoClient(dbUrl);

async function main() {
  console.log("Conectando ao Banco de Dados MongoDB");

  await client.connect();

  console.log("Banco de Dados conectado com sucesso");

  // Lista
  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

  const db = client.db(dbName);
  const collection = db.collection("item");

  // Read All - [GET] /item
  app.get("/item", async function (req, res) {
    // Obter todos os documentos da Collection
    const documentos = await collection.find().toArray();

    res.send(documentos);
  });

  // Sinalizamos para o Express que vamos usar JSON no body
  app.use(express.json());

  // Create - [POST] /item
  app.post("/item", async function (req, res) {
    // Obtemos o nome enviado no Request Body
    const item = req.body;

    // Inserimos o item no final da lista
    await collection.insertOne(item);

    // Enviamos uma mensagem de Sucesso
    res.send(item);
  });

  // Read By Id - [GET] /item/:id
  app.get("/item/:id", function (req, res) {
    const id = req.params.id;

    const item = lista[id - 1];

    res.send(item);
  });

  // Update - [PUT] /item/:id
  app.put("/item/:id", function (req, res) {
    const id = req.params.id;

    const novoItem = req.body.nome;

    lista[id - 1] = novoItem;

    res.send("Item Atualizado com Sucesso: " + id);
  });

  app.listen(3000);
}

main();
