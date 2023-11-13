import Asistencia from '../models/asistencia.model.js';

export const registro = async(req, res) =>{
    const {nombre, apellidoPaterno, apellidoMaterno, fecha} = req.body;
    //Expresión regular para validar que no se acepten caracteres especiales(excepto acentos) ni numeros
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

    try {
        //Validar que todos los datos sean no vacios
        if (!nombre || !apellidoPaterno || !apellidoMaterno || !fecha) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        //Validar que el nombre no contenga caracteres especiales o números 
        if (!permitido.test(nombre)) {
            return res.status(400).json({ error: "Nombre inválido, solo se aceptan acentos como caracteres especiales" });
        }
        //Validar que el apellido paterno no contenga caracteres especiales o números 
        if (!permitido.test(apellidoPaterno)) {
            return res.status(400).json({ error: "Apellido paterno inválido, solo se aceptan acentos como caracteres especiales" });
        }
        //Validar que el apellido materno no contenga caracteres especiales o números 
        if (!permitido.test(apellidoMaterno)) {
            return res.status(400).json({ error: "Apellido materno inválido, solo se aceptan acentos como caracteres especiales" });
        }
        
        const newAsistencia = new Asistencia({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fecha
        });
        //Validar el modelo de asistencia
        await newAsistencia.validate();
        await newAsistencia.save();
        res.json({
            newAsistencia
        })
    } catch (error) {
        res.status(500).json({error: "Ha surgido un problema al registrar la asistencia"});
        console.log(error);
    }
}

export const buscar = async(req, res) =>{
    try {
        await Asistencia.find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json ({message:error}));
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error"});
        console.log(error);
    }
}

//El metodo no es utilizado en el sistema
export const actualizar = async (req, res) =>{
    const id = req.params.id;
    const {nombre, apellidoPaterno, apellidoMaterno} = req.body;

    try {
        Asistencia.updateMany({
            _id:id
        },
        {
            $set:{
                nombre,
                apellidoPaterno,
                apellidoMaterno
            },
        })
        .then((data)=>res.json(data))
        .catch((error)=>res.json ({message:error}));
    } catch (error) {
        res.status(500).json({error: "Ha surgido un problema al actualizar la asistencia"});
        console.log(error);
    }
}
//El metodo no es utilizado en el sistema
export const eliminar = async(req, res) =>{
    const id = req.params.id;
    try{
        await Asistencia.findByIdAndDelete(id);
        res.send('Se ha eliminado correctamente');
    }catch(error){
        res.status(500).json({error: "Ha ocurrido un error, no se ha eliminado"});
    }
}