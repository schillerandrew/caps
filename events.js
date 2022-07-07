'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');
const driverHandler = require('./driver/handleDriver');
const vendorHandler = require('./vendor/handleVendor');

const chance = new Chance();

eventPool.on('PICKUP', driverHandler);
// eventPool.on('IN-TRANSIT', () => logger('IN-TRANSIT', payload));
// eventPool.on('DELIVERED');

function logger(event, payload) {
  console.log('EVENT:', event, new Date(), payload);
}

setInterval(() => {
  let event = {
    event: 'pickup',
    time: new Date(),
    payload: {
      store: chance.company(),
      orderID: chance.fbid(),
      customer: chance.name(),
      address: chance.address()
    }
  };
  console.log('EVENT:', 'pickup', new Date(), event.payload);
  eventPool.emit('PICKUP', event);
}, 2000);