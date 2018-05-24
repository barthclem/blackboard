'use strict';

(function() {

  var socket = io();
  var note = document.getElementById('note');
  var board = document.getElementById('board');
  var navBoard = document.getElementById('');

  function sendNote(){
    console.log('write something now');
    socket.emit('master-write', {
      note: board.value
    });
  }

 socket.on('log', (data) => {
 note.innerText += `> ${data.note}`;
});

  socket.on('write-down', (data) => {
    note.innerText = `${data.note}`;
  });




})();
