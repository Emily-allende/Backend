const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const putUsuario = await prisma.usuario.update({})