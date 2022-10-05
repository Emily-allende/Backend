import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.put("/usuario", verifyToken, async (req, res)=>{
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

index.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))