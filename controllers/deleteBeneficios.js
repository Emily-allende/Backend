import { verifyToken } from './../jwt'

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.delete("/beneficio/:id", verifyToken ,async (req, res)=>{
    const donacion = await prisma.beneficio.delete({
        where:{id}
    })
    res.json(donacion);
})

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));