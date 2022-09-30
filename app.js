const express = require('express')
const { PrismaClient } = require('@prisma/client')
const app = express()
const prisma = new PrismaClient()
app.use(express.json()) 


app.post('/user/singup', async (req, res)=>{
     const {nombre, apellido, empresa, email, contraseña, img_perfil, ubicacion:{lat, long}} = req.body;
     const user = await prisma.usuario.create({
       data:{
         nombre, 
         apellido, 
         empresa, 
         email, 
         contraseña, 
         img_perfil, 
         ubicacion:{
           lat, 
           long
         }},
     });
     res.json(user);
   });
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000, http://localhost:3000"))
