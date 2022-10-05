const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()
index.use(express.json());

const hola = index.get('/beneficios', async (req, res)=>{
    const posts = await prisma.beneficio.findMany({})
    res.json(posts)
})

index.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))

export default hola;
