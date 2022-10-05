import { verifyToken } from './verifyToken';

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

const jwt= require("jsonwebtoken")

index.post("/contactos", verifyToken, async (req,res)=>{
    const {nombre, logo, link}= req.body
    const result = await prisma.usuario.create({
      data:{
        nombre,
        logo,
        link
      },
    })
    res.json(result)
    return jwt.verify(req.token, "secretKey", (error, authData)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Post fue creado",
                authData 
            })
        }
    })
})

index.listen(3000,()=>console.log("Corriendo"))