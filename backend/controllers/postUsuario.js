const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.post('/user/singup', async (req, res)=>{
    const {nombre, apellido, empresa, email, contraseña, img_perfil, ubicacion:{lat, long}} = req.body;
    const result = await prisma.usuario.create({
      data:{
        nombre, 
        apellido, 
        empresa, 
        email, 
        contraseña, 
        img_perfil, 
        ubicacion:{
          lat, 
          long
        }},
    })
    res.json(result)
  })
