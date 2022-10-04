// import postUsuario from "./controllers/postUsuario";
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const index = express()
const prisma = new PrismaClient()
index.use(express.json()) 

// index.use("", postUsuario);
index.get('/', function(req, res) {
     res.send("Hola");
   });

   index .listen(3000, () => console.log("Servidor corriendo en el puerto 3000, http://localhost:3000"))
