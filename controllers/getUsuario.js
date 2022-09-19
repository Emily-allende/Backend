import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.get("/usuario", verifyToken,async (req, res)=>{
    const user = await prisma.usuario.findUnique({
        where:{id}
    })
        res.json(user);
});

app.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))