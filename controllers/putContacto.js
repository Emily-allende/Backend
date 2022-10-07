import { verifyToken } from './verifyToken';

const express = require("express")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.put('/contactos/:id', verifyToken, async (req, res)=>{
    const {nombre, logo, link} = req.body;
    const contacto = await prisma.contacto.create({
        where:{id},
        data:{
            nombre,
            logo,
            link
        },
    });
    res.json(contacto)
  });


app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));