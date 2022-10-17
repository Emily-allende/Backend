import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const contactoRouter = express.Router();

contactoRouter.get('/',  (req, res)=>{
    const posts =  prisma.contacto.findMany({})
    res.json(posts)
})

contactoRouter.post("/", (req,res)=>{
    const {logo, link}= req.body
    const result = prisma.contacto.create({
      data:{
        logo,
        link
      },
    })
    res.json(result)
})

contactoRouter.put('/:id', (req, res)=>{
    const {nombre, logo, link} = req.body;
    const contacto = prisma.contacto.update({
        where:{id},
        data:{
            nombre,
            logo,
            link
        },
    });
    res.json(contacto)
  });

export {contactoRouter}