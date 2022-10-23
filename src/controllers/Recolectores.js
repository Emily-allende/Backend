import express from 'express';
import { PrismaClient } from '@prisma/client';
import { manejanUsuarios } from '../helpers/manejaUsuarios.js';
import { verifyToken } from '../helpers/verifyToken.js';

const prisma = new PrismaClient()
const recolectorRouter = express.Router();

recolectorRouter.post("/:id", verifyToken, async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, img_perfil, latitud, longitud, idAdmin, fecha } = req.body
    const administrador = await prisma.administrador.findUnique({
      where: {
        ID: idAdmin
      }
    })

    console.log(administrador)
    console.log(idAdmin)

    if (administrador) {
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

      await prisma.recolector.create({
        data: {
          ID: post.ID,
          lugarRecoleccion: parseInt(req.params.id),
        }
      });

      await manejanUsuarios(idAdmin, "create", post.ID, res, fecha)

      post['lugarRecoleccion'] = req.params.id,
      res.json(post);
    } else {
      res.status(400).send("Solo un administrador puede efectuar esta accion.")
    }
  } catch (e) {
    if (e.code === 'P2002') {
      res.status(400).send("El email ya esta registrado en otra cuenta.");
    } else {
      if (e.code === 'P2002') {
        res.status(400).send("Debe seleccionar un lugar de recoleccion valido")
      } else {
        res.json(e);
      }
    }
  }
})

recolectorRouter.get("/", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findMany({
      include: {
        recolector: true,
      },
      where: {
        NOT: [{ recolector: null }],
      }
    });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
})

recolectorRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findUnique({
      include: {
        recolector: true,
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

export { recolectorRouter };
