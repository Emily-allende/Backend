import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function manejanUsuarios(idAdmin, accion, idUser, res, fecha) {
  await prisma.manejanusuarios.create({
    data: {
      fecha: new Date(`${fecha}`),
      accion: accion,
      Administrador: idAdmin,
      Usuario: idUser
    }
  })
}

export { manejanUsuarios };