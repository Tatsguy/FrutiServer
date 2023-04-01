const express = require('express');
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const socket = require('./sockets/socket')
const conectarMongoDB = require('./conexion')
const app = express();
const httpServer = http.createServer(app)
const io = new Server({
    cors: {
        origin: '*'
    }
})

socket(io);

app.use(cors());
conectarMongoDB();

const port = 8080;

io.listen(port, () => {
    console.log("Servidor en el puerto: " + port);
})