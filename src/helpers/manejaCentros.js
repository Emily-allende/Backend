import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function manejaCentros(idRecolector, accion, idCentro) {
  try {
    await prisma.manejalugarrecoleccion.create({
      data: {
        accion: accion,
        Recolector: parseInt(idRecolector),
        LugarRecoleccion: parseInt(idCentro)
      }
    })
  } catch (e) {
    console.log(e);
  }
}

export { manejaCentros };