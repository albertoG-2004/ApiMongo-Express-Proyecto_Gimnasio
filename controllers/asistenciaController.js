import Asistencia from '../models/asistencia.model.js';

export const registroDia = async(req, res) =>{
    const { nombre, apellidoPaterno, apellidoMaterno, fecha} = req.body;
    const plan = "Dia"
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
            fecha,
            plan
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

export const registroMensual = async(req, res) =>{
    const {id_cliente, nombre, apellidoPaterno, apellidoMaterno, fecha} = req.body;
    const plan = "Mensual"
    //Expresión regular para validar que no se acepten caracteres especiales(excepto acentos) ni numeros
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const id = parseInt(id_cliente);

    try {
        //Validar que todos los datos sean no vacios
        if (!id || !nombre || !apellidoPaterno || !apellidoMaterno || !fecha) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        if (isNaN(id)) {
            return res.status(400).json({ error: "El id debe ser un número" });
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
            id,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fecha,
            plan
        });
        //Validar el modelo de asistencia
        await newAsistencia.validate();
        await newAsistencia.save();
        res.json({
            newAsistencia
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha surgido un problema al registrar la asistencia"});
    }
}

export const buscarAsistencia = async (req, res) =>{
    const { id_cliente, fecha } = req.body;
    const id = parseInt(id_cliente);

    try {
        if (!id || !fecha){
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        if (isNaN(id)) {
            return res.status(400).json({ error: "El id debe ser un número" });
        }
        const cliente = await Asistencia.findOne({
            id,
            fecha
        })
        
        res.json({
            cliente
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha surgido un problema al buscar la asistencia"});
    }
}

export const buscardia = async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;
    const plan = "Dia";
    try {
        const cantidadDocumentos = await Asistencia.countDocuments({
            fecha: {
                $gte: fechaInicio,
                $lte: fechaFin
            },
            plan: plan
        })
        res.json({ cantidadDocumentos })
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" });
        console.log(error);
    }
}

export const buscarmes = async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;
    const plan = "Mensual";
    try {
        const cantidadDocumentos = await Asistencia.countDocuments({
            fecha: {
                $gte: fechaInicio,
                $lte: fechaFin
            },
            plan: plan
        })
        res.json({ cantidadDocumentos })
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" });
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