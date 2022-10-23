import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../helpers/verifyToken.js';
import { parse } from 'date-fns';

const prisma = new PrismaClient()
const donacionRouter = express.Router();

donacionRouter.post("/:idUser", verifyToken, async (req, res) => {
  try {
    const { tipo, cantidad, valor_tokens, fecha, lugarId, recolectorId } = req.body
    console.log(fecha)

    await prisma.recolector.findUnique({
      where: { ID: parseInt(recolectorId) }
    })

    const post = await prisma.donacion.create({
      data: {
        Donante: parseInt(req.params.idUser),
        cantidad: parseInt(cantidad),
        tipo,
        fecha: new Date(`${fecha}`),
        valor: parseInt(valor_tokens),
      }
    })

    const user = await prisma.donante.findUnique({
      where: {
        ID: parseInt(req.params.idUser)
      }
    })

    const account = await prisma.donante.update({
      where: {
        ID: parseInt(req.params.idUser),
      },
      data: {
        cuenta: parseInt(user.cuenta) + parseInt(valor_tokens),
      }

    })
    console.log(lugarId)
    await prisma.recolectadosen.create({
      data: {
        Donacion: post.ID,
        Lugar: parseInt(lugarId),
      }
    })

    post['cuentaUsuario'] = account.cuenta;
    res.json(post);
  } catch (e) {
    if (e.code === 'P2003') {
      res.status(400).send("Los recolectores, administradores o benefactores no pueden efectuar donaciones.");
    } else {
      res.json(e);
    }
    console.log(e)
  }
})

donacionRouter.get("/", verifyToken, async (req, res) => {
  try {
    const post = await prisma.donacion.findMany()
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

donacionRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.donacion.findMany({
      where: { Donante: parseInt(req.params.id) }
    })
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export { donacionRouter }
