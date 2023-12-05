import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import {PORT} from './config.js'
import mongoose from 'mongoose'
import router from './routes/message.js'
import bodyParser from 'body-parser'

let newMessageCount = 0;//----------------

//Mongoose configuration **********************************************************
var url = 'mongodb+srv://paolis2828:bsZYVvk4hLAE3qul@cluster0.7m5y57t.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = global.Promise;

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use('/api', router);


//Nos conectamos a mongoDB. Opción { useNewUrlParser: true } para utilizar las últimas funcionalidades de mongoDB
mongoose.connect(url, { useNewUrlParser: true }).then(() =>{
    console.log('Conexión con la BDD realizada con éxito!!!');
    server.listen(PORT, () =>{
		console.log('servidor ejecutándose en http://localhost:', PORT );
	});
})