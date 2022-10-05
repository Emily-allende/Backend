const express = require('express')
const { PrismaClient } = require('@prisma/client')

const index = express()
const prisma = new PrismaClient()

index.delete('/user/singou', async (req, res)=>{
    const posts = await prisma.usuario.delete (
        {where: id}
    );
    res.json({posts});
})