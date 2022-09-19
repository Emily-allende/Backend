import { verifyToken } from '../verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.post("/beneficios/:id", verifyToken, async (req, res)=>{
    const {descripción, imagen, empresa, precio,} =req.body;
    const donacion = await prisma.beneficio.update({
        where:{id},
        data:{
            descripción,
            imagen,
            empresa,
            precio
        }
    })
    res.json(donacion);
})

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));