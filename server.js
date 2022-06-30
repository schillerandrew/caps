'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./queue');

// singleton
const server = new Server(PORT);

// namespace (http://localhost:3002/caps)
const caps = server.of('./caps');

const messageQueue = new Queue();

caps.on('connection', (socket) => {
  console.log('>>> Joined the caps namespace', socket.id);

  // logger
  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT:', {event, time, payload});
  })

  // joining a room
  socket.on('JOIN', (queueID) => {
    socket.join(queueID);
    socket.emit('JOIN', queueID);
  })

  socket.on('PICKUP', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    if (!currentQueue) {
      let queueKey = messageQueue.save(payload.queueID, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.save(payload.messageID, payload); // let message = 
    caps.emit('PICKUP', payload);
  })

  socket.on('TRANSIT', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    if (!currentQueue) {
      let queueKey = messageQueue.save(payload.queueID, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.save(payload.messageID, payload); // let message = 
    caps.to(payload.store).emit('TRANSIT', payload);
  })

  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    if (!currentQueue) {
      let queueKey = messageQueue.save(payload.queueID, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    let message = currentQueue.remove(payload.messageID);
    caps.emit('DELIVERED', message); // or payload instead of message
  })

  // RECEIVED event
  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    if (!currentQueue) {
      throw new Error('no queue created for this message');
    }
    let message = currentQueue.remove(payload.message);
    caps.to(payload.queueID).emit('RECEIVED', message);
  })

  // GET-ALL event
  socket.on('GET-ALL', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    Object.keys(currentQueue.data).forEach((messageID) => {
      caps.emit('MESSAGE', currentQueue.read(messageID));
    })
  })

  // combined received event
  // socket.on('RECEIVED', (payload) => {
  //   let currentQueue = messageQueue.read(payload.queueID);
  //   if (!currentQueue) {
  //     throw new Error('no queue created for this message');
  //   }
  //   Object.keys(currentQueue.data).forEach(queueItem => {
  //     console.log('>>> Wow the RECEIVED event actually ran', queueItem);
  //     let message = currentQueue.remove(payload.messageID);
  //     caps.to(payload.queueID).emit('RECEIVED', message);
  //   })
  // })
})