'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');
const driverHandler = require('./driver/handleDriver');
const vendorHandler = require('./vendor/handleVendor');

const chance = new Chance();

// let randomPayload = {
//   store: chance.company(),
//   orderID: chance.fbid(),
//   customer: chance.name(),
//   address: chance.address()
// }

// chance.name(); full name
// chance.address(); street address
// chance.fbid() id
// chance.company() store name

const dateAndTime = new Date();
// console.log(dateAndTime);

eventPool.on('PICKUP', driverHandler);
// eventPool.on('IN-TRANSIT');
// eventPool.on('DELIVERED');

setInterval(() => {
  let event = {
    event: 'pickup',
    time: dateAndTime,
    payload: {
      store: chance.company(),
      orderID: chance.fbid(),
      customer: chance.name(),
      address: chance.address()
    }
  };
  console.log('EVENT', event);
  eventPool.emit('PICKUP', { test: 'test' });
}, 1000);