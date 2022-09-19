import verifyToken from "../jwt";
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());


const jwt= require("jsonwebtoken")
const keys = require('./settings/keys');

app.delete('/user/signout',  verifyToken, async (req, res)=>{
    const posts = await prisma.usuario.delete({where: id})
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({posts});
            authData
        }
    });
})

app.listen(3000,()=> console.log("Servidor corriendo en el puerto 3000"))