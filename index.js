
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 5000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket){
 // socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

  socket.on('master-write', (data) => {
    io.emit('write-down', {
      note: data.note
    });
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));