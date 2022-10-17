import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const centrosRouter = express.Router();

centrosRouter.get('/', (req, res)=>{
    const posts = prisma.lugarrecoleccion.findUnique({where:{ID:10}})
    res.json(posts)
})

centrosRouter.post("/", (req, res)=>{
    const {nombre, imagen, ubicacion:{lat, long,}} = req.body;
    const centro = prisma.lugarrecoleccion.create({
        data:{
            nombre,
            imagen,
            ubicacion:{
                lat,
                long
            },
        }
    })
    res.json(centro);
    console.log(centro);
})

export {centrosRouter}