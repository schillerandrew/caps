'use strict';

const { Server } = require('socket.io');


const PORT = process.env.PORT || 3002;

// singleton
const server = new Server(PORT);

// namespace
const caps = server.of('./caps');

// logging
function logEvent(event, payload){
  let time = new Date();
  console.log('EVENT', {event, time, payload});
}

// joining a room
socket.on('JOIN', (room) => {
  console.log(`>>> You've joined the ${room} room!`);
  socket.join(room);
})

server.on('connection', (socket) => {
  console.log('>>> Socket connected to event server', socket.id);

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    logEvent('IN-TRANSIT', payload);
    caps.emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    logEvent('DELIVERED', payload);
    caps.emit('DELIVERED', payload);
  });
});