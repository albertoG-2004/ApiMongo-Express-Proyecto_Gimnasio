import ClientesRutina from "../models/clientesRutina.model.js";

export const registro = async(req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, celular, contraseña } = req.body;
    //Expresión regular para validar que no se acepten caracteres especiales(excepto acentos) ni numeros
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    //Expresión regular para validar que sean 10 caracteres numéricos
    const celularPermitido = /^[0-9]{10}$/;

    try {
        //Validar que todos los datos sean no vacios
        if (!nombre || !apellidoPaterno || !apellidoMaterno || !celular || !contraseña) {
            return res.status(400).json({error:"Todos los campos son obligatorios"});
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
        //Validar que el celular sea de 10 caracteres numéricos 
        if (!celularPermitido.test(celular)) {
            return res.status(400).json({ error: "Celular inválido, solo se aceptan 10 caracteres numéricos" });
        }
        if (contraseña.length !== 8) {
            return res.status(400).json({ error: "Contraseña inválida, la contraseña debe contener 8 caracteres" });
        }
        const newCliente = new ClientesRutina({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            celular,
            contraseña
        })
        //Validar el modelo de clientesrutina
        await newCliente.validate();
        await newCliente.save();
        res.json({
            newCliente
        })
    } catch (error) {
        res.status(500).json({error: "Ha surgido un problema al registrar al cliente"});
        console.log(error);
    }
}

export const buscar = async(req, res) =>{
    const {celular, contraseña} = req.body;
    const celularPermitido = /^[0-9]{10}$/;

    try {
        if (!celularPermitido.test(celular)) {
            return res.status(400).json({ error: "Celular inválido, solo se aceptan 10 caracteres numéricos"})
        }
        if (contraseña.length !== 8) {
            return res.status(400).json({ error: "Contraseña inválida, la contraseña debe tener 10 caracteres"})
        }
        const cliente = await ClientesRutina.findOne({
            celular,
            contraseña
        })
        res.json({
            cliente
        })
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error"});
        console.log(error);
    }
}