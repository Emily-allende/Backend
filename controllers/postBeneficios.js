const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.post("/beneficios", async (req, res)=>{
    const {descripción, imagen, empresa, precio,} =req.body;
    const beneficio = await prisma.beneficio.create({
        data:{
            descripción,
            imagen,
            empresa,
            precio
        }
    })
    res.json(beneficio);
})

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));