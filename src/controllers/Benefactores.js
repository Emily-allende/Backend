import express from 'express';
import { PrismaClient } from '@prisma/client';
import { manejanUsuarios } from '../helpers/manejaUsuarios.js';
import { verifyToken } from '../helpers/verifyToken.js';

const prisma = new PrismaClient()
const benefactorRouter = express.Router();

benefactorRouter.get("/", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findMany({
      include: {
        benefactor: true,
      },
      where: {
        NOT: [{ benefactor: null }],
      }
    });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.sendStatus(error);
  }
});

benefactorRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findUnique({
      include: {
        benefactor: true,
      },
      where: {
        ID: parseInt(req.params.id)
      }
    });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.sendStatus(error);
  }
});

benefactorRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, img_perfil, latitud, longitud, empresa, idAdmin, fecha } = req.body
    await prisma.administrador.findMany({
      where: {
        ID: idAdmin
      }
    })

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
    await prisma.benefactor.create({
      data: {
        ID: post.ID,
        empresa: empresa,
      }
    });
    await manejanUsuarios(idAdmin, "create", post.ID, res, fecha)

    post['empresa'] = empresa,
      res.json(post);
  } catch (e) {
    if (e.code === 'P2002') {
      res.status(400).send("El email ya esta registrado en otra cuenta.");
    } else {
      res.json(e)
    }
  }
})

export { benefactorRouter }; 