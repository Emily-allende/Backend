// import { verifyToken } from './verifyToken';
import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const usuarioGetRouter = express.Router();

usuarioGetRouter.get("/", async (req, res) => { 
  const post = await prisma.usuario.findUnique({where: {ID: 222}})
  res.json(post);
})