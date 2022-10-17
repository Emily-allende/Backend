const nodemailer = require("nodemailer");

export let transporter = nodemailer.createTransport({
    host: "smtp.email.com",
    port: 465,
    secure: true, 
    auth: {
      user: 'emily.allende@anima.edu.uy',
      pass: 'dlkvyjitueswfvts',
    },
  });

  transporter.verify().then (()=> {console.log('Ready for send emails')})

  try{ 
   await transporter.sendMail({ 
    from: '"EcoLoops" <foo@example.com>',  
     to: email,  
     subject: "EcoLoops",  
     html: ` <b>Hola ${nombre}, Bienvenida a la comunidad EcoLoops</b> 
     <b>Muchas gracias</b> `, 
   }); 

 }catch(error){ 
  return res.status(400).json({message:'Error'}) 
}