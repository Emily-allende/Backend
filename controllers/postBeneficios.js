const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.post("/beneficios", async (req, res)=>{
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

index.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));