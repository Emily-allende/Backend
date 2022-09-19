const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
app.use(express.json());

app.get('/contactos', async (req, res)=>{
    const posts = await prisma.contacto.findMany({})
    res.json(posts)
})

app.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))