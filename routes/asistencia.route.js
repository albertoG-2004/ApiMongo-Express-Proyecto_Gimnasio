import { Router } from 'express';
import { registroDia,registroMensual, buscarAsistencia, buscardia, buscarmes, actualizar, eliminar } from '../controllers/asistenciaController.js'

const rutasAsistencia = Router();

rutasAsistencia.post('/registrarplandia', registroDia);
rutasAsistencia.post('/registrarplanmes', registroMensual);
rutasAsistencia.post('/buscarasistencia', buscarAsistencia);
rutasAsistencia.post('/asistenciasdia', buscardia);
rutasAsistencia.post('/asistenciasmes', buscarmes);
rutasAsistencia.put('/actualizar', actualizar);
rutasAsistencia.delete('/eliminar', eliminar);

export default rutasAsistencia;