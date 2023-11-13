import { Router } from 'express';
import { registro, buscar, actualizar, eliminar } from '../controllers/asistenciaController.js'

const rutasAsistencia = Router();

rutasAsistencia.post('/registrar', registro);
rutasAsistencia.get('/buscar', buscar);
rutasAsistencia.put('/actualizar', actualizar);
rutasAsistencia.delete('/eliminar', eliminar);

export default rutasAsistencia;