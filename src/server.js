const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('dist'));

io.on('connection', (socket) => {
  console.log('Connection');

  socket.on('event', (event) => {
    console.log(event);
    socket.broadcast.emit('event', event);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});