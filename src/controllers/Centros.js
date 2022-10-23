import express from 'express';
import { PrismaClient } from '@prisma/client';
import { manejaCentros } from '../helpers/manejaCentros.js';
import { verifyToken } from '../helpers/verifyToken.js';

const prisma = new PrismaClient()
const centrosRouter = express.Router();

centrosRouter.get('/', async (req, res)=>{
    try{
        const posts = await prisma.lugarrecoleccion.findMany()
        res.json(posts)   
    }catch(error){
        res.json(error)
    }
})

centrosRouter.post("/:id", verifyToken, async (req, res)=>{

  try {
    const {nombre, imagen, latitud, longitud} = req.body;

    const admin = await prisma.administrador.findUnique({
      where: { ID: parseInt(req.params.id) }
    })
    if(admin) {
      const post = await prisma.lugarrecoleccion.create({
        data:{
          nombre,
          imagen,
          latitud,
          longitud
        }
      })
      res.json(post);      
    } else {
      res.status(400).send("Esta accion solo puede ser efectuada por un administrador");      
    }

  } catch (e) {
    res.json(e);
    console.log(e)
  }
})

centrosRouter.put("/:id", verifyToken, async (req, res)=>{
  try {
    const {nombre, imagen, latitud, longitud, idRecolector} = req.body;

    const post = await prisma.lugarrecoleccion.update({
      where: {
        ID: parseInt(req.params.id)
      },
      data:{
        nombre,
        imagen,
        latitud,
        longitud
      }
    })
    manejaCentros(idRecolector, "update", parseInt(req.params.id))
    res.json(post);
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})


centrosRouter.get("/:id", verifyToken, async (req, res)=>{
  try {
    const response = await prisma.recolectadosen.findMany({
      where: { Lugar: parseInt(req.params.id) },
      include: { donacion: true }
    })
    res.json(response)
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})

centrosRouter.get("/manage/:id", verifyToken, async (req, res)=>{
  try {
    const response = await prisma.manejalugarrecoleccion.findMany({
      where: { LugarRecoleccion: parseInt(req.params.id) },
      include: {
        recolector: {
          include: {
            usuario: true,
          },
        },
    
      }
    })
    res.json(response)
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})

export {centrosRouter}