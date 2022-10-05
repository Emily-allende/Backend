const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()
index.use(express.json())

index.delete('/usuario', async (req, res)=>{
    const posts = await prisma.usuario.findMany({})
    res.json(posts)
})

index.listen(3000, ()=> console.log("Estoy corriendo"))