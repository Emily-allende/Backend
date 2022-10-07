const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.delete('/user/singou', async (req, res)=>{
    const posts = await prisma.usuario.delete (
        {where: id}
    );
    res.json({posts});
})