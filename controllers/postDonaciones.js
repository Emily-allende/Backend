import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.post("/donaciones/:id",verifyToken ,async (req, res)=>{
    const {tipo, cantidad, valor_tokens} =req.body;
    const donacion = await prisma.donacion.create({
        data:{
            tipo,
            cantidad,
            valor_tokens
        }
    })
    res.json(donacion);
})

index.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));