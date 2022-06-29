'use strict';

const  { io }  = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const Chance = require('chance');
const chance = new Chance();

const handleDelivered = require('./handleDelivered');

const store = '1-800-PETSHOP';
socket.emit('JOIN', store);

socket.on('DELIVERED', handleDelivered);

setInterval( () => {
  
}, 2000);