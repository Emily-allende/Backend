import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const usuarioRouter = express.Router();
usuarioRouter.post("/", (req, res) => { 
  console.log("Llege")
  const { nombre, apellido, empresa, email, contraseña, img_perfil, ubicacion:{lat, long}} = req.body
  const post =  prisma.usuario.create({
    data: {
      nombre,
      apellido,
      empresa,
      email, 
      contraseña,
      img_perfil,
      ubicacion:{
        lat,
        long
      }
    }
  })
  res.json(post);
  console.log(post);
  // return jwt.sign({post}, "secretkey", (err, token)=> {
  //   res.json(token);
  // })
})

export {usuarioRouter};

// import { Transport } from "./../confing/mail";
// const jwt = require("jsonwebtoken")
// app.post( async (req, res)=>{
//nombre, apellido, empresa, email, contraseña, img_perfil, ubicacion
//     const user = await prisma.usuario.create({
//       data:{
//         nombre, 
//         apellido, 
//         empresa, 
//         email, 
//         contraseña, 
//         img_perfil, 
//         ubicacion:{
//           lat, 
//           long
//         }},
    //     return: jwt.sign({user},"secretkey", (err, token)=> {
    //       res.json({token})
    //     })
    // });
  // });
// try{
//   await transporter.sendMail({
//     from: '"EcoLoops" <foo@example.com>', 
//     to: email, 
//     subject: "EcoLoops", 
//     html: `
//     <b>Hola ${nombre}, Bienvenida a la comunidad EcoLoops</b>
//     <b>Muchas gracias</b>
//     `,
//   });
// }catch(error){
//   return res.status(400).json({message:'Error'})


