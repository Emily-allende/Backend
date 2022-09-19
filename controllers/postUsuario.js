import { Transport } from "./../confing/mail";
const express = require("express")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")

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
        return: jwt.sign({user},"secretkey", (err, token)=> {
          res.json({token})
        })
    });
  });

try{
  await transporter.sendMail({
    from: '"EcoLoops" <foo@example.com>', 
    to: email, 
    subject: "EcoLoops", 
    html: `
    <b>Hola ${nombre}, Bienvenida a la comunidad EcoLoops</b>
    <b>Muchas gracias</b>
    `,
  });
}catch(error){
  return res.status(400).json({message:'Error'})
}
 
app.listen(3000, ()=> console.log("Corriendo en el puerto 3000"));
