import mongoose from "mongoose";

const rutinaSchema = new mongoose.Schema({
    nombre:{type: String, required: true},
    descripcion:{type: String, required: true},
    series:{type: Number, required: true},
    repeticiones:{type: Number, required: true}
})

export default mongoose.model('Rutina', rutinaSchema);