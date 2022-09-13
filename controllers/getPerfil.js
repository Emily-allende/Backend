const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.delete('/usuario', async (req, res)=>{
    const posts = await prisma.user.findMany({})
    res.json(posts)
})