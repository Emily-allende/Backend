import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../helpers/verifyToken.js';
import { parse } from 'date-fns';

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

contactoRouter.get('/:id', async (req, res) => {
  try {
    const posts = await prisma.contacto.findMany({
      where: {ID: parseInt(req.params.id)}
    })
    res.json(posts)
  } catch (error) {
    res.json(error)
  }
})

contactoRouter.post("/", verifyToken, async(req, res) => {
  const { logo, link } = req.body
  try {
    const result = await prisma.contacto.create({
      data: {
        logo,
        link,
        nroInteracciones: 0
      },
    })
    res.json(result)
  } catch (error) {
    res.json(error)
  }
})

contactoRouter.put('/:id', verifyToken, async (req, res, next) => {
  const { logo, link } = req.body

  try {  
    const contacto =  await prisma.contacto.update({
      where: { ID: parseInt(req.params.id) },
      data: {
        logo,
        link
      },
    });
    res.json(contacto)
  } catch (error) {
    res.json(error)
  }
});

contactoRouter.put('/interact/:id', async (req, res) => {
  try {  
    const contacto =  await prisma.contacto.findUnique({
      where: { ID: parseInt(req.params.id) },
    });
    const updated =  await prisma.contacto.update({
      where: { ID: parseInt(req.params.id) },
      data: {
        nroInteracciones : contacto.nroInteracciones + 1
      }
    });
    res.json(updated)
  } catch (error) {
    res.json(error)
  }
});



export { contactoRouter }