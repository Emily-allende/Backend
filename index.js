import {usuarioRouter} from "./src/controllers/Usuario.js";
import {beneficioRouter} from "./src/controllers/Beneficio.js";
import {centrosRouter} from "./src/controllers/Centros.js";
import {contactoRouter} from "./src/controllers/Contacto.js";

import express from "express";

const app = express()
app.use(express.json()) 

/* Usuarios */ 
app.use("/users", usuarioRouter);

/*Beneficios*/
app.use("/beneficios", beneficioRouter);

/*Centros */
app.use("/centros", centrosRouter);

/*Contacros */
app.use("/contactos", contactoRouter);


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000, http://localhost:3000"))
