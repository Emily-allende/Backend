import { verifyToken } from './../jwt'

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.delete("/beneficio/:id", verifyToken ,async (req, res)=>{
    const donacion = await prisma.beneficio.delete({
        where:{id}
    })
    res.json(donacion);
})

index.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));