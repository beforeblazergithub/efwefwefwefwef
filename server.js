const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var users = 0;

server.listen(3000, () => {
    console.log('Blazer on localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    users += 1;
    io.emit('count', users)
    socket.on('disconnect', function() {
        users -= 1;
        io.emit('count', users)
    });
});