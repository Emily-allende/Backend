import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const usuRouter = express.Router();

usuRouter.get("/", async (req, res) => { 
  console.log("hola");
  const post = await prisma.usuario.findUnique({where: {ID: 222}})
  console.log(post);
})

export {usuRouter};