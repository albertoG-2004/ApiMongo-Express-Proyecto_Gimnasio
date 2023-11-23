import { Router } from "express";
import { registro, buscar } from "../controllers/clientesRutinaController.js";

const rutasClienteRutina = Router();

rutasClienteRutina.post('/registrar', registro);
rutasClienteRutina.post('/login', buscar);

export default rutasClienteRutina;