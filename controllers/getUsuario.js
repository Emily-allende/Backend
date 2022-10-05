import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.get("/usuario", verifyToken,async (req, res)=>{
    const user = await prisma.usuario.findUnique({
        where:{id}
    })
        res.json(user);
});

index.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))