'use strict';

const eventPool = require('../eventPool');

eventPool.on('DELIVERED', handleDelivered);

function handleDelivered(event) {
  console.log('VENDOR: Thank you for delivering order', event.payload.orderID);
  console.log('EVENT:', 'delivered', new Date(), event.payload);
  console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>');
}

module.exports = handleDelivered;