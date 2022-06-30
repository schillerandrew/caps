'use strict';

const  { io }  = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const Chance = require('chance');
const chance = new Chance();

// const handleDelivered = require('./handleDelivered');

const storeName = '1-800-PETSHOP';
socket.emit('JOIN', storeName);

function handleDelivered(payload) {
  console.log(`>>> DELIVERED ${payload.orderID}`, payload);
}

socket.on('DELIVERED', handleDelivered);

setInterval( () => {
  let order = {
    store: storeName,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  }
  socket.emit('PICKUP', order);
}, 2000);