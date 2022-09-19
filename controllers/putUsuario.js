import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.put("/usuario", verifyToken, async (req, res)=>{
    const {nombre, apellido, empresa, email, contraseña, img_perfil, ubicacion:{lat, long}}= req.body
    const result = await prisma.usuario.update({
        where:{id},
        data:{
            nombre, 
            apellido, 
            empresa, 
            email, 
            contraseña, 
            img_perfil, 
            ubicacion:{
              lat, 
              long
            }},
        })
        res.json(result);
});

app.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))