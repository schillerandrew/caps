'use strict';

const Chance = require('chance');
const chance = new Chance();

const VendorClient = require('./vendorClient');
const acmeVendor = new VendorClient('acme-widgets');
const flowersVendor = new VendorClient('1-800-flowers');

setInterval(() => {
  let payload = {
    store: 'acme-widgets',
    orderID: chance.fbid(),
    customer: chance.name(),
    address: chance.address()
  };

  acmeVendor.publish('PICKUP', { messageID: chance.guid(), payload});
}, 2000);

setInterval(() => {
  let payload = {
    store: '1-800-flowers',
    orderID: chance.fbid(),
    customer: chance.name(),
    address: chance.address()
  };
  
  flowersVendor.publish('PICKUP', { messageID: chance.guid(), payload});
}, 3000);

acmeVendor.subscribe('DELIVERED', payload => {
  console.log('VENDOR: Thank you for delivering order', payload.orderID);
});

acmeVendor.subscribe('RECEIVED', () => {
  console.log('VENDOR: Thank you for my messages from the queue');
});

flowersVendor.subscribe('DELIVERED', payload => {
  console.log('VENDOR: Thank you for delivering order', payload.orderID);
});

flowersVendor.subscribe('RECEIVED', () => {
  console.log('VENDOR: Thank you for my messages from the queue');
});