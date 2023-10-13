const express = require('express');
const mongoose = require("mongoose");
const rutas = require("./routes/asistencia.route");
const app = express();
app.use(express.json());


app.listen(3001, ()=> {
    console.log("El servidor esta en el puerto 3001");
})
app.use("/apimongo", rutas);

mongoose.connect("mongodb://127.0.0.1/proyecto_gimnasio")
.then(()=> console.log("conectado"))
.catch(()=> console.log("error"));

module.exports = app;