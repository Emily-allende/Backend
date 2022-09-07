const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.delete('/user/singou', async (req, res)=>{
    
})