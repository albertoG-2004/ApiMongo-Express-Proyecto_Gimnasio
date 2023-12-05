import express from 'express';
import { conn } from './connection/connection.js';
import rutasAsistencia from './routes/asistencia.route.js';
import rutasRutina from './routes/rutinaRoute.js';
import rutasClienteRutina from './routes/clienteRutinaRoute.js';
import dotenv from "dotenv";
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})
app.use("/gimnasio/asistencia", rutasAsistencia);
app.use("/gimnasio/rutina", rutasRutina);
app.use("/gimnasio/clientesrutina", rutasClienteRutina);


conn();

io.on('connection', (socket) =>{
    socket.on('message', (message, nickname) => {

        newMessageCount++;
    io.emit('newMessage', newMessageCount);
        console.log(message)
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })
})

const port = process.env.PORT;
server.listen(port, ()=>{
    console.log("El servidor esta corriendo en el puerto 3001");
})