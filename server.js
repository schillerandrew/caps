'use strict';

const { Socket } = require('engine.io');
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
  });

  // received event
  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    if (!currentQueue) {
      throw new Error('no queue created for this message');
    }
    let message = currentQueue.remove(payload.message);
    caps.to(payload.queueID).emit('RECEIVED', message);
  })

  // getAll event
  socket.on('GET-ALL', (payload) => {
    let currentQueue = messageQueue.read(payload.queueID);
    Object.keys(currentQueue.data).forEach((messageID) => {
      caps.emit('MESSAGE', currentQueue.read(messageID));
    });
  });
});