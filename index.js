
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 5000;

const net = require('net');
var tcpGuests = [];
app.use(express.static(__dirname + '/public'));

function onConnection(socket){
 // socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

  socket.on('master-write', (data) => {
    io.emit('write-down', {
      note: data.note
    });
  });

 socket.on('hello', (data) => {
  console.log(`Hello -> ${data}`);
});
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));

var tcpServer = net.createServer(function (socket) {
  console.log('tcp server running on port 1337');
  console.log('web server running on http://localhost:3000');
});

tcpServer.on('connection',function(socket){
    socket.write('connected to the tcp server\r\n');
    console.log('num of connections on port 1337: ' + tcpServer.connections);
    io.emit('log', {note: `> A client is connected`});
    tcpGuests.push(socket);


    socket.on('data',function(data){
        console.log('received on tcp socket:'+data);
        socket.write(' msg received\r\n');
	io.emit('log', {note: `Msg Received ${data}`});
        //send data to guest socket.io chat server
    });
});
tcpServer.listen(1337);
