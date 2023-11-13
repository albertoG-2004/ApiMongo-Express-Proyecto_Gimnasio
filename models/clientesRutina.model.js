import mongoose from "mongoose";

const clientesRutinaSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    apellidoPaterno: {type: String, require: true},
    apellidoMaterno: {type: String, require: true},
    celular: {type: String, require: true}
})

export default mongoose.model('ClientesRutina', clientesRutinaSchema);