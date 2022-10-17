import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const beneficioRouter = express.Router();

beneficioRouter.delete("/:id", async (req, res)=>{
    const donacion = await prisma.beneficio.delete({
        where:{id}
    })
    res.json(donacion);
})

beneficioRouter.get('/', async (req, res)=>{
    try{
        const posts = await prisma.beneficio.findMany({})
        res.json(posts)
    }catch(error){
        res.json(error)
    }
})

beneficioRouter.put("/:id", (req, res)=>{
    const {descripción, imagen, empresa, precio,} =req.body;
    const donacion = prisma.beneficio.update({
        where:{id},
        data:{
            descripción,
            imagen,
            empresa,
            precio
        }
    })
    res.json(donacion);
})

beneficioRouter.post("/", (req, res)=>{
    const {descripción, imagen, empresa, precio,} =req.body;
    const beneficio = prisma.beneficio.create({
        data:{
            descripción,
            imagen,
            empresa,
            precio
        }
    })
    res.json(beneficio);
})
export {beneficioRouter};