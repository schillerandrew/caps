'use strict';

const DriverClient = require('./driverClient');

const driver = new DriverClient();

driver.subscribe('PICKUP', payload => {
  setTimeout(() => {
    console.log('DRIVER: picked up order', payload.order.orderID);
    driver.publish('TRANSIT', payload);
  }, 2000);

  setTimeout(() => {
    console.log('DRIVER: delivered order', payload.order.orderID);
    driver.publish('DELIVERED', payload);
  }, 2000);
});