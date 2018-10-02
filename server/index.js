const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let code = '';

app.get('/api/refId', (req, res)=>{
  axios.get(process.env.RANDOM_ID_URL).then((response)=>{
    console.log(response.data);
    res.send(response.data);
  })
})

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
