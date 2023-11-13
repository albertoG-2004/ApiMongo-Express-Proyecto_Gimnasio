import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellidoPaterno: {type: String, required: true},
    apellidoMaterno: {type: String, required: true},
    fecha: {type: String, required: true},
    pagoDia: {type: String, required: false}
})

export default mongoose.model('Asistencia', asistenciaSchema);