import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.post("/admin/centros", verifyToken, async (req, res)=>{
    const {nombre, imagen, ubicacion:{lat, long,}} = req.body;
    const donacion = await prisma.lugarrecoleccion.create({
        data:{
            nombre,
            imagen,
            ubicacion:{
                lat,
                long
            },
        }
    })
    res.json(donacion);
})

index.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));