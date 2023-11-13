import Rutina from '../models/rutina.model.js';

export const registro = async(req, res) =>{
    const{ nombre, descripcion, series, repeticiones } = req.body;
    //Expresión regular para validar que no se acepten caracteres especiales(excepto acentos) ni numeros
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    //Expresión regular para validar que no se acepten caracteres especiales(excepto acentos y punto) se aceptan numeros
    const descripcionPermitida = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9.\s]+$/;

    try {
        //Validar que todos los datos sean no vacios
        if(!nombre || !descripcion || !series || !repeticiones){
            return res.status(400).json({error:"Todos los campos son obliatorios"});
        }
        //Validar que el nombre no contenga caracteres especiales o números 
        if (!permitido.test(nombre)) {
            return res.status(400).json({error:"Nombre de la rutina invalido, sin caracteres especiales solo acentos permitidos"})
        }
        //Validar que la desciprción no contenga caracteres especiales, solo punto
        if (!descripcionPermitida.test(descripcion)) {
            return res.status(400).json({error:"Descripción de la rutina invalida, sin caracteres especiales solo acentos, numeros y punto permitidos"})
        }
        //Crear una variable auxiliar para parsear las series en caso de recibirla como cadena
        let seriesAux = parseInt(series);
        //Validar que seriesAux sea un número
        if(isNaN(seriesAux)){
            return res.status(400).json({error:"Series debe ser un número"})
        }
        //Crear una variable auxiliar para parsear las repeticiones en caso de recibirla como cadena
        let repeticionesAux = parseInt(repeticiones);
        //Validar que seriesAux sea un número
        if(isNaN(repeticionesAux)){
            return res.status(400).json({error:"Repeticiones debe ser un número"})
        }

        const newRutina = new Rutina({
            nombre,
            descripcion,
            series: seriesAux,
            repeticiones: repeticionesAux
        })
        //Validar el modelo de rutina
        await newRutina.validate();
        await newRutina.save();
        res.json({
            newRutina
        })
    } catch (error) {
        res.status(500).json({error: "Ha surgido un problema al registrar la rutina"});
        console.log(error);
    }
}

export const buscar = async(req, res) =>{
    try {
        await Rutina.find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json ({message:error}));
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error"});
        console.log(error);
    }
}