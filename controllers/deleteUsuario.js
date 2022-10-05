import { verifyToken } from '../verifyToken'

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.use(express.json());

index.delete("/admin/usuario/:id", verifyToken ,async (req, res)=>{
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

index.listen(3000, ()=> console.log("Corriendo en el puerto 3000"))
