import express from 'express';
import { PrismaClient } from '@prisma/client';
// import { createRequire } from 'module';

const prisma = new PrismaClient()
const usuRouter = express.Router();

usuRouter.get("/:UserID", async ({params: {UserID}}, res) => { 
  // const require = createRequire(import.meta.url);
  const post = await prisma.usuario.findUnique({where: {id: UserID}})
  res.json(post);
  // console.log(post);
  // const url = require('url').parse(req.url, true).query;
})

export {usuRouter};