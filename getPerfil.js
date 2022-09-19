const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
app.use(express.json())

app.delete('/usuario', async (req, res)=>{
    const posts = await prisma.usuario.findMany({})
    res.json(posts)
})

app.listen(3000, ()=> console.log("Estoy corriendo"))