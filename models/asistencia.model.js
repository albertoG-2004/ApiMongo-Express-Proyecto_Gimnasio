const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
    noLista: {type: Number, require: true},
    nombre: {type: String, require: true},
    ApellidoPaterno: {type: String, require: true},
    ApellidoMaterno: {type: String, require: true},
    fecha: {type: String, require: true}
})

module.exports = mongoose.model("asistencia", asistenciaSchema);