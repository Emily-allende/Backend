const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()
index.use(express.json())
 
 index.post('/user/singin', async (req, res)=>{
  const {email, contraseña}= req.body
  const result = await prisma.usuario.create({
    data:{
      email,
      contraseña
    },
  })
  res.json(result)
 })

 index.listen(3000, ()=> console.log("Corriendo"))
 
