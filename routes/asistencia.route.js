import { Router } from 'express';
import { registroDia,registroMensual, buscardia, buscarmes, actualizar, eliminar } from '../controllers/asistenciaController.js'

const rutasAsistencia = Router();

rutasAsistencia.post('/registrarplandia', registroDia);
rutasAsistencia.post('/registrarplanmes', registroMensual);
rutasAsistencia.post('/asistenciasdia', buscardia);
rutasAsistencia.post('/asistenciasmes', buscarmes);
rutasAsistencia.put('/actualizar', actualizar);
rutasAsistencia.delete('/eliminar', eliminar);

export default rutasAsistencia;