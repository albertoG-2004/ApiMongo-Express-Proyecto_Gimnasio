import mongoose from "mongoose";

const clientesRutinaSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    apellidoPaterno: {type: String, required: true},
    apellidoMaterno: {type: String, required: true},
    celular: {type: String, required: true}
})

export default mongoose.model('ClientesRutina', clientesRutinaSchema);