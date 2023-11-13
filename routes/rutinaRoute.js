import { Router } from "express";
import { registro, buscar } from "../controllers/rutinaController.js";

const rutasRutina = Router();

rutasRutina.post('/registrar', registro)
rutasRutina.get('/buscar', buscar)

export default rutasRutina;