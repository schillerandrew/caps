'use strict';

const eventPool = require('../eventPool');

module.exports = (payload) => {
  console.log('DRIVER: picked up id');
  eventPool.emit('IN-TRANSIT', payload);
  console.log('DRIVER: delivered id');
  eventPool.emit('DELIVERED', payload);
}