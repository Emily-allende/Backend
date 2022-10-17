import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const usuarioRouter = express.Router();

usuarioRouter.get("/", (req, res) => { 
    const post = prisma.usuario.findMany()
    console.log(post);
    res.json(post);
  })

usuarioRouter.post("/", (req, res) => { 
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

usuarioRouter.put("/:id", async (req, res)=>{
    const {nombre, apellido, empresa, email, contraseña, img_perfil, ubicacion:{lat, long}}= req.body
    const result = await prisma.usuario.update({
        where:{id},
        data:{
            nombre, 
            apellido, 
            empresa, 
            email, 
            contraseña, 
            img_perfil, 
            ubicacion:{
              lat, 
              long
            }},
        })
        res.json(result);
});

usuarioRouter.delete("/:id", async (req, res)=>{
    const usuario = await prisma.usuario.delete({
        where:{ID}
    })
    res.json(usuario);
})

export {usuarioRouter};
