'use strict';

const eventPool = require('./eventPool');
const driverHandler = require('./driver/handleDriver');
const vendorHandler = require('./vendor/handleVendor');

eventPool.on('PICKUP', driverHandler);
// eventPool.on('IN-TRANSIT');
// eventPool.on('DELIVERED');

setInterval( () => {
  eventPool.emit('PICKUP', { test: 'test' });
  console.log(eventPool);
}, 1000);