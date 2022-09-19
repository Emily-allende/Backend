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