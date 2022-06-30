'use strict';

const { Server } = require('socket.io');


const PORT = process.env.PORT || 3002;

// singleton (http://localhost:3002)
const server = new Server(PORT);

// namespace (http://localhost:3002/caps) 
const caps = server.of('/caps');

// logging
function logEvent(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}

// connecting to namespace
caps.on('connection', (socket) => {
  console.log('>>> Socket connected to event server, with socket ID', socket.id);

  // joining a room
  socket.on('JOIN', (room) => {
    console.log(`>>> You've joined the ${room} room!`);
    socket.join(room);
  })

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    logEvent('IN-TRANSIT', payload);
    // to emit to a room: use .to and then the room name
    caps.to(payload.store).emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    logEvent('DELIVERED', payload);
    caps.to(payload.store).emit('DELIVERED', payload);
  });
});