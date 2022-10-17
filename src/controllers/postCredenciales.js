import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const credencialesRouter = express.Router();

credencialesRouter.post('/user/singin', async (req, res)=>{
  const {email, contraseña}= req.body
  const result = await prisma.usuario.create({
    data:{
      email,
      contraseña
    },
  })
  res.json(result)
 })

 export {credencialesRouter};
 
