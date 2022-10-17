import {usuarioRouter} from "./src/controllers/Usuario.js";
import {beneficioRouter} from "./src/controllers/Beneficio.js";
import {centrosRouter} from "./src/controllers/Centros.js";
import {contactoRouter} from "./src/controllers/Contacto.js";

import express, { Router } from "express";
const app = express()
app.use(express.json()) 

/* Usuarios */ 
app.use("/users", usuarioRouter);
app.use("/userGet", usuarioRouter);
app.use("admin/usuario/:id", usuarioRouter);

/*Beneficios*/
app.use("/beneficios", beneficioRouter);
app.use("/benefificio", beneficioRouter)
app.use("/beneficio/:id", beneficioRouter);
app.use("/beneficios/:id", beneficioRouter);

/*Centros */
app.use("/", centrosRouter)
app.use("/centros", centrosRouter);

/*Contacros */
app.use("/contactos", contactoRouter);

/*Perfil*/


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000, http://localhost:3000"))
