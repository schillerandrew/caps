'use strict';

const  { io }  = require('socket.io-client');

const socket = io('http://localhost:3002/caps');

socket.on('PICKUP', () => {
  setTimeout( () => {
    console.log(`DRIVER: picked up order ${payload.orderID}`);
    socket.emit('IN-TRANSIT', payload)
  }, 2000);

  setTimeout( () => {
    console.log(`DRIVER: delivered order ${payload.orderID}`);
    socket.emit('DELIVERED', payload);
  }, 2000);
});