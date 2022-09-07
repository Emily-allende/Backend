const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
 
 app.post('/user/singin', async (req, res)=>{
  const {email, contraseña}= req.body
  const result = await prisma.usuario.create({
    data:{
      email,
      contraseña
    },
  })
  res.json(result)
 })
 
