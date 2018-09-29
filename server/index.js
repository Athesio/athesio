const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');

app.use(express.static(__dirname + '/../client/dist'));

let code = '';

io.on('connection', (socket) => {
  console.log('New client connected: ', socket.id);

  io.emit('newClientConnection', code);

  socket.on('clientUpdateCode', (newCode) => {
    code = newCode;
    console.log('updated to: ', code);
    io.emit('serverUpdateCode', code);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
