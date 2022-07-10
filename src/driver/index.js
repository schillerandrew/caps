'use strict';

const DriverClient = require('./driverClient');

const acmeDriver = new DriverClient('acme-widgets');
const flowersDriver = new DriverClient('1-800-flowers');

acmeDriver.subscribe('PICKUP', payload => {
  setTimeout(() => {
    console.log('DRIVER: picked up order', payload.orderID);
    acmeDriver.publish('TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log('DRIVER: delivered order', payload.orderID);
    acmeDriver.publish('DELIVERED', payload);
  }, 2000);
});

flowersDriver.subscribe('PICKUP', payload => {
  setTimeout(() => {
    console.log('DRIVER: picked up order', payload.orderID);
    flowersDriver.publish('TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log('DRIVER: delivered order', payload.orderID);
    flowersDriver.publish('DELIVERED', payload);
  }, 2000);
});