import { Router } from "express";
import { registro, buscar, modificar, eliminar } from "../controllers/rutinaController.js";

const rutasRutina = Router();

rutasRutina.post('/registrar', registro);
rutasRutina.get('/buscar', buscar);
rutasRutina.put('/modificarutina', modificar);
rutasRutina.delete('/eliminarutina', eliminar);

export default rutasRutina;