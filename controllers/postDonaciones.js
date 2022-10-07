import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.post("/donaciones/:id",verifyToken ,async (req, res)=>{
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

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));