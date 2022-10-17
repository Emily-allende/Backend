const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.post("/admin/usuario", async (req, res)=>{
    const {nombre, apellido, empresa, ubicación:{lat, long}, img_perfil, email,contraseña} = req.body;
    const admin = await prisma.lugarrecoleccion.create({
        data:{
            nombre,
            apellido,
            empresa,
            ubicación: {
            lat,
            long,
            },
            img_perfil,
            email,
            contraseña
            },
            return: jwt.sign({user},"secretkey", (err, token)=> {
                res.json({token})
            })
    })
    res.json(admin);
})

app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));