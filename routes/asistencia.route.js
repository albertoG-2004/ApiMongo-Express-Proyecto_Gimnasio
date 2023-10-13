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

module.exports = router;