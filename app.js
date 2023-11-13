import express from 'express';
import { conn } from './connection/connection.js';
import rutasAsistencia from './routes/asistencia.route.js';
import rutasRutina from './routes/rutinaRoute.js';
import rutasClienteRutina from './routes/clienteRutinaRoute.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/gimnasio/asistencia", rutasAsistencia);
app.use("/gimnasio/rutina", rutasRutina);
app.use("/gimnasio/clientesrutina", rutasClienteRutina);

conn();
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log("El servidor esta corriendo en el puerto 3001");
})