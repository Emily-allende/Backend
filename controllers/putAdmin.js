import { verifyToken } from '../verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.put("/admin/usuario/:id", verifyToken, async (req, res)=>{
    const {nombre, apellido, empresa, ubicación:{lat, long}, img_perfil, email,contraseña} = req.body;
    const admin = await prisma.lugarrecoleccion.update({
        where:{id},
        data:{
            nombre,
            apellido,
            empresa,
            ubicación: {
            lat,
            long,
            },
            img_perfil,
            email,
            contraseña
            }
    })
    res.json(admin);
})

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));