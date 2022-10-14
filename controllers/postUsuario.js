import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const usuarioRouter = express.Router();
usuarioRouter.post("/", (req, res) => { 
  console.log("Llege")
  const { nombre, apellido, email, contraseña, img_perfil, ubicacion:{lat, long}} = req.body
  const post =  prisma.usuario.create({
    data: {
      nombre,
      apellido,
      email, 
      contraseña,
      img_perfil,
      ubicacion:{
        lat,
        long
      }
    }
  })
  res.json(post);
  console.log(post);
})

export {usuarioRouter};
