import { Router } from "express";
import { registro } from "../controllers/clientesRutinaController.js";

const rutasClienteRutina = Router();

rutasClienteRutina.post('/registrar', registro);

export default rutasClienteRutina;