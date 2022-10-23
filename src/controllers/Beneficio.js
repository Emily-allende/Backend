import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../helpers/verifyToken.js';

const prisma = new PrismaClient()
const beneficioRouter = express.Router();

beneficioRouter.get('/', async (req, res)=>{
    try{
        const posts = await prisma.beneficio.findMany({
          where: {
            disable: false
          }
        })
        res.json(posts)
    }catch(error){
        res.json(error)
        console.log(error)
    }
})

beneficioRouter.get('/:id', verifyToken, async (req, res)=>{
  try{
      const posts = await prisma.beneficio.findMany({
        where: { Benefactor: parseInt(req.params.id)}
      })
      res.json(posts)
  }catch(error){
      res.json(error)
      console.log(error)
  }
})

beneficioRouter.post("/:id", verifyToken, async (req, res)=>{
  try {
    const { descripcion, imagen, empresa, precio } =req.body;

    const benefactor = await prisma.benefactor.findUnique({
      where: { ID: parseInt(req.params.id) }
    })
    if (benefactor) {
      const post = await prisma.beneficio.create({
        data:{
          descripcion,
          imagen,
          empresa,
          precio: parseInt(precio),
          Benefactor: parseInt(req.params.id),
          disable: false
        }
      })
      res.json(post);
    } else {
      res.status(400).send("Solo los benefactores pueden crear beneficios")
    }
  } catch (e) {
    if (e.code === 'P2003') {
      res.status(400).send("Solo los benefactores pueden crear beneficios")
    } else {
      res.json(e);
    }
    console.log(e)
  }
})

beneficioRouter.post("/use/:id", verifyToken, async (req, res)=>{
  try {
    const { idUser, fecha } =req.body;

    const beneficio = await prisma.beneficio.findUnique({
      where: {
        ID: parseInt(req.params.id),
      }
    })

    const user = await prisma.donante.findUnique({
      where: {
        ID: idUser
      }
    })

    if(user.cuenta >= beneficio.precio ) {
      console.log(user)
      const post = await prisma.utilizabeneficio.create({
        data:{
          Donante: idUser,
          Beneficio: parseInt(req.params.id),
          fecha: new Date(`${fecha}`),
          valor: beneficio.precio
        }
      })
      await prisma.donante.update({
        where: { ID: idUser},
        data:{
          cuenta: user.cuenta - beneficio.precio
        }
      })
      res.json(post);
    } else {
      res.status(400).send("Saldo insuficiente en la cuenta.")
    }
 
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})

beneficioRouter.get('/used', verifyToken, async (req, res)=>{
  try{
      const posts = await prisma.utilizabeneficio.findMany()
      res.json(posts)
  }catch(error){
      res.json(error)
      console.log(error)
  }
})

beneficioRouter.get('/used/:id', verifyToken, async (req, res)=>{
  try{
      const posts = await prisma.utilizabeneficio.findMany({
        where: {
          Beneficio: parseInt(req.params.id) 
        }
      })
      res.json(posts)
  }catch(error){
      res.json(error)
      console.log(error)
  }
})


beneficioRouter.put("/:id", verifyToken, async (req, res)=>{
  try {
    const { descripcion, imagen, precio } =req.body;

    const post = await prisma.beneficio.update({
      where: {
        ID: parseInt(req.params.id)
      },
      data:{
        descripcion,
        imagen,
        precio,
      }
    })
    res.json(post);
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})

beneficioRouter.put("/able/:id", verifyToken, async (req, res) => {
  try {
    const upd = await prisma.beneficio.update({
      where: { ID: parseInt(req.params.id) },
      data: {
        disable: false,
      }
    })
    res.json(upd);
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})


beneficioRouter.put("/disable/:id", verifyToken, async (req, res) => {
  try {
    const upd = await prisma.beneficio.update({
      where: { ID: parseInt(req.params.id) },
      data: {
        disable: true,
      }
    })
    res.json(upd);
  } catch (e) {
    res.json(e);
    console.log(e)
  }
})

export {beneficioRouter};