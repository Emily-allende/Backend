import { usuarioRouter } from "./src/controllers/Usuario.js";
import { benefactorRouter } from "./src/controllers/Benefactores.js";
import { recolectorRouter } from "./src/controllers/Recolectores.js";
import { admRouter } from "./src/controllers/Admin.js";
import { beneficioRouter } from "./src/controllers/Beneficio.js";
import { centrosRouter } from "./src/controllers/Centros.js";
import { contactoRouter } from "./src/controllers/Contacto.js";
import { donacionRouter } from "./src/controllers/Donacion.js";

import express from "express";
import cors from "cors"

const app = express()
app.use(express.json()) 
app.use(cors())

/* Usuarios */ 
app.use("/users", usuarioRouter);

app.use("/benefactor", benefactorRouter);

app.use("/recolector", recolectorRouter);

app.use("/admin", admRouter);

/* Beneficios */
app.use("/benefits", beneficioRouter);

/* Centros */
app.use("/centers", centrosRouter);

/* Contactos */
app.use("/contacts", contactoRouter);

/* Donaciones */
app.use("/donation", donacionRouter);

app.listen(3001, () => console.log("Servidor corriendo en el puerto 3001, http://localhost:3001"))
