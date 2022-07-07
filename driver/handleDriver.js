'use strict';

const eventPool = require('../eventPool');

// eventPool.on('PICKUP', driverPickup);

// function driverPickup(event) {
//   setTimeout(() => {
//     console.log('DRIVER: picked up ', event.payload.orderID);
//     eventPool.emit('IN-TRANSIT', event);
//     console.log('EVENT:', 'in-transit', new Date(), event.payload);
//   }, 1000);

//   setTimeout(() => {
//     console.log(`DRIVER: delivered ${event.payload.orderID}`);
//     eventPool.emit('DELIVERED', event);
//   }, 1000);
// }

module.exports = (event) => {
  setTimeout(() => {
    console.log('DRIVER: picked up ', event.payload.orderID);
    eventPool.emit('IN-TRANSIT', event);
    console.log('EVENT:', 'in-transit', new Date(), event.payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered ${event.payload.orderID}`);
    eventPool.emit('DELIVERED', event);
  }, 1000);
}