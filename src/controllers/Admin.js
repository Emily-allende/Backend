import express from 'express';
import { PrismaClient } from '@prisma/client';
import { manejanUsuarios } from '../helpers/manejaUsuarios.js';
import { verifyToken } from '../helpers/verifyToken.js';

const prisma = new PrismaClient()
const admRouter = express.Router();

admRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, img_perfil, latitud, longitud, idAdmin, fecha } = req.body
    
    const post = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        contrase_a: contraseña,
        img_perfil,
        latitud,
        longitud,
      }
    });
    await manejanUsuarios(idAdmin, "create", post.ID, res, fecha)
    await prisma.administrador.create({
      data: {
        ID: post.ID,
      }
    });
    res.json(post);
  } catch (e) {
    if (e.code === 'P2002') {
      res.status(400).send("El email ya esta registrado en otra cuenta.");
    } else {
      res.json(e)
    }
  }
})

admRouter.get("/", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findMany({
      include: {
        administrador: true,
      },
      where: {
        NOT: [{ administrador: null }],
      }
    });
    res.json(post);

  } catch (error) {
    res.json(error);
  }
})

admRouter.get("/manage", verifyToken, async (req, res) => {
  try {
    const post = await prisma.manejanusuarios.findMany({
      include: {
        administrador: true,
        usuario: true,
      },
    });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
})

admRouter.get("/manage/:id", verifyToken, async (req, res) => {

  try {
    const post = await prisma.manejanusuarios.findMany({
      where: {
        administrador: parseInt(req.params.id)
      },
      include: {
        administrador: true,
        usuario: true,
      },
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
})

admRouter.get("/manage/user/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.manejanusuarios.findMany({
      where: {
        Usuario: parseInt(req.params.id)
      },
      include: {
        administrador: true,
        usuario: true,
      },
    });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
})

export { admRouter }