import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const perfilRouter = express.Router();

perfilRouter.get('/usuario', async (req, res)=>{
    const posts = await prisma.usuario.findMany({})
    console.log(posts)
    res.json(posts)
})

perfilRouter.delete('/:id', async (req, res)=>{
    const posts = await prisma.usuario.delete (
        {where: id}
    );
    res.json({posts});
})

export {perfilRouter}
