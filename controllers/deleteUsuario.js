import { verifyToken } from '../verifyToken'

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.delete("/admin/usuario/:id", verifyToken ,async (req, res)=>{
    const usuario = await prisma.usuario.delete({
        where:{ID}
    })
    res.json(usuario);
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Post fue creado",
                    authData
                });
        }})
})

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"))
