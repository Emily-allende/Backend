import { verifyToken } from '../verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.post("/beneficio/:id/utilizar", verifyToken, async (req, res)=>{
    const {id_user, valor_token} = req.body;
    const beneficio = await prisma.beneficio.create({
        data:{
           id_user,
           valor_token
            }
    })
    res.json(beneficio);
})

index.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));