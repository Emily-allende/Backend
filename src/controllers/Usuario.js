import express, { response } from 'express';
import { PrismaClient } from '@prisma/client';
import { parseConnectionUrl } from 'nodemailer/lib/shared/index.js';
import { generateAccessToken } from '../helpers/generateAccessToken.js';
import jwt from 'jsonwebtoken';
import { manejanUsuarios } from '../helpers/manejaUsuarios.js';
import { verifyToken } from '../helpers/verifyToken.js';

const { sign, verify } = jwt

const prisma = new PrismaClient()
const usuarioRouter = express.Router();

usuarioRouter.get("/", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findMany({
      include: {
        recolector: true,
        benefactor: true,
        donante: true,
        administrador: true,
      },
    })
    let response = []
    post.map((data) => {
      if (data.benefactor) {
        delete data.benefactor
        delete data.donante
        delete data.recolector
        delete data.administrador
        data['rol'] = "benefactor"
        response.push(data)
      } if (data.donante) {
        delete data.benefactor
        delete data.donante
        delete data.recolector
        delete data.administrador
        data['rol'] = "donante"
        response.push(data)
      } if (data.recolector) {
        delete data.benefactor
        delete data.donante
        delete data.recolector
        delete data.administrador
        data['rol'] = "recolector"
        response.push(data)
      } if (data.administrador) {
        delete data.benefactor
        delete data.donante
        delete data.recolector
        delete data.administrador
        data['rol'] = "administrador"
        response.push(data)
      }
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
})

usuarioRouter.get("/donors", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findMany({
      include: {
        donante: true,
      },
      where: {
        NOT: [{ donante: null }],
      }
    });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
})

let refreshTokens = []

usuarioRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.usuario.findUnique({
      include: {
        recolector: true,
        benefactor: true,
        donante: true,
        administrador: true,
      },
      where: {
        ID: parseInt(req.params.id)
      }
    });

    if (post.benefactor) {
      delete post.benefactor
      delete post.donante
      delete post.recolector
      delete post.administrador
      post['rol'] = "benefactor"
    } if (post.donante) {
      delete post.benefactor
      delete post.donante
      delete post.recolector
      delete post.administrador
      post['rol'] = "donante"
    } if (post.recolector) {
      delete post.benefactor
      delete post.donante
      delete post.recolector
      delete post.administrador
      post['rol'] = "recolector"
    } if (post.administrador) {
      delete post.benefactor
      delete post.donante
      delete post.recolector
      delete post.administrador
      post['rol'] = "administrador"
    }

    res.json(post);
  } catch (error) {
    res.json(error);
  }
})

usuarioRouter.post("/", async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, img_perfil, latitud, longitud } = req.body
    const user = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        contrase_a: contraseña,
        img_perfil,
        latitud,
        longitud,
      }
    });
    await prisma.donante.create({
      data: {
        ID: user.ID,
        cuenta: 0,
      }
    });
    const accessToken = generateAccessToken(user)
    const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    user['cuenta'] = 0
    res.json({ user, accessToken: accessToken, refreshToken: refreshToken });
  } catch (e) {
    if (e.code === 'P2002') {
      res.status(400).send("El email ya esta registrado en otra cuenta.");
    }
    res.json(e);
  }
})

usuarioRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const { nombre, apellido, contraseña, img_perfil, latitud, longitud } = req.body
    const result = await prisma.usuario.update({
      where: { ID: parseInt(req.params.id) },
      data: {
        nombre,
        apellido,
        contrase_a: contraseña,
        img_perfil,
        latitud,
        longitud,
      },
    })
    res.json(result);
  } catch (e) {
    res.json(e)
    console.log(e)
  }
});

usuarioRouter.put("/:id/company", verifyToken, async (req, res) => {
  try {
    const benefactor = await prisma.benefactor.findMany({
      where: {
        ID: parseInt(id)
      }
    })
    if (benefactor) {
      const { empresa } = req.body
      const result = await prisma.benefactor.update({
        where: { ID: parseInt(req.params.id) },
        data: {
          empresa
        },
      })

      await prisma.beneficio.updateMany({
        where: { Benefactor: parseInt(req.params.id) },
        data: {
          empresa
        },
      })

      res.json(result);
    } else {
      res.status(400).send("Solo un benefactor puede efectuar esta accion")
    }
  } catch (e) {
    res.json(e)
  }
});

usuarioRouter.post("/signin", async (req, res) => {
  try {
    const { email, contraseña } = req.body

    const user = await prisma.usuario.findFirst({
      where: {
        email,
        contrase_a: contraseña
      }
    })
    if (user) {
      const accessToken = generateAccessToken(user)
      const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken)
      res.json({ user, accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(400).send('Email o contraseña incorrectos');
    }
  } catch (e) {
    res.json(e)
    console.log(e)
  }
});

usuarioRouter.post('/token', (req, res) => {
  const refreshToken = req.body.token
  console.log(refreshTokens)
  console.log(refreshToken)
  console.log(typeof refreshToken)

  if (refreshToken == null) {
    res.sendStatus(401)
  } else {
    if (!refreshTokens.includes(`${refreshToken}`)) {
      res.sendStatus(403)
    } else {
      verify(`${refreshToken}`, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.sendStatus(403)
        } else {
          const accessToken = generateAccessToken(user)
          res.json({ accessToken: accessToken })
        }
      })
    }
  }
})


usuarioRouter.delete('/signout', (req, res) => {
  refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})


export { usuarioRouter };
