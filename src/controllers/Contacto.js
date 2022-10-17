import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const contactoRouter = express.Router();

contactoRouter.get('/', async (req, res) => {
  try {
    const posts = await prisma.contacto.findMany({})
    res.json(posts)
  } catch (error) {
    res.json(error)
  }
})

contactoRouter.post("/", (req, res) => {
  const { logo, link } = req.body
  const result = prisma.contacto.create({
    data: {
      logo,
      link
    },
  })
  res.json(result)
})

contactoRouter.put('/:id', (req, res) => {
  const { nombre, logo, link } = req.body;
  const contacto = prisma.contacto.update({
    where: { id },
    data: {
      nombre,
      logo,
      link
    },
  });
  res.json(contacto)
});

export { contactoRouter }