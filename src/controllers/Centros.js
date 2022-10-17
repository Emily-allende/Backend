import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const centrosRouter = express.Router();

centrosRouter.get('/', async(req, res)=>{
    try{
        const posts = await prisma.lugarrecoleccion.findMany()
        res.json(posts)   
    }catch(error){
        res.json(error)
    }
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