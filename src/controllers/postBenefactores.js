import { verifyToken } from '../verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.post("/admin/benefactores/:id",verifyToken, async (req, res)=>{
    const {nombre, imagen, ubicacion:{lat, long,}} = req.body;
    const donacion = await prisma.benefactor.create({
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

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));