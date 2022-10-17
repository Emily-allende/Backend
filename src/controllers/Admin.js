import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const admRouter = express.Router();

admRouter.post("/", async (req, res)=>{
    const {nombre, apellido, empresa, ubicación:{lat, long}, img_perfil, email,contraseña} = req.body;
    const admin = await prisma.lugarrecoleccion.create({
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
            },
            return: jwt.sign({user},"secretkey", (err, token)=> {
                res.json({token})
            })
    })
    res.json(admin);
})

admRouter.put("/:id", verifyToken, async (req, res)=>{
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


export {admRouter}