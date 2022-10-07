import {usuarioRouter} from "./controllers/postUsuario.js";
import {usuarioGetRouter} from "./controllers/getUsuario.js";
import express from "express";

const app = express()
app.use(express.json()) 

app.use("/users", usuarioRouter);
app.use("/users", usuarioGetRouter);

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000, http://localhost:3000"))
