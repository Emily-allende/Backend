const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
import * as postUsu from '.postUsuario';

async function main() {
    postUsu();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })