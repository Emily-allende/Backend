import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const donacionRouter = express.Router();

donacionRouter.post("/", (req, res) => { 
    const post =  prisma.donacion.create({
      data:{
          tipo,
          cantidad,
          valor_tokens
      }
    })
    res.json(post);
    console.log(post);
  })

export {donacionRouter}