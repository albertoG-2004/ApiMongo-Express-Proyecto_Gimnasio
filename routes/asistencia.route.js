const router = require('express').Router();
const asistencia = require('../models/asistencia.model');

router.get("/", async (req, res) => {
    try {
        const Asistencia = await asistencia.find();
        res.json(Asistencia);
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error"});
    }
});

router.post("/asistencia", async (req, res) => {
    try {
        const newAsistencia = await asistencia.create(req.body);
        res.json(newAsistencia);
    } catch (error) {
        res.status(500).json({error: "Hay un error"});
    }
});

router.put("/modificar/:noLista", (req, res)=>{
    try {
        const {id} = req.params;
        const {nombre, ApellidoPaterno, ApellidoMaterno, fecha}=req.body;
        asistencia.updateMany({
            noLista:id,
        },
        {
            $set:{
                nombre:nombre,
                ApellidoPaterno:ApellidoPaterno,
                ApellidoMaterno:ApellidoMaterno,
                fecha:fecha,
            },
        }
        )
        .then((data)=>res.json(data))
        .catch((error)=>res.json ({message:error}));
    } catch (error) {
        res.status(500).json({error:"ha ocurrido un error"});
    }
});

router.delete("/eliminar/:noLista", async (req, res) =>{
    try{
        const Asistencia = await asistencia.findByIdAndDelete(req.params.noLista);
        res.json(Asistencia);
    }catch(error){
        res.status(500).json({error: "Ha ocurrido un error, no se ha eliminado"});
    }
});

module.exports = router;