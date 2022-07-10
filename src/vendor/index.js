'use strict';

const Chance = require('chance');
const chance = new Chance();

const VendorClient = require('./vendorClient');
const acmeVendor = new VendorClient('acme-widgets');
const flowersVendor = new VendorClient('1-800-flowers');

setInterval(() => {
  let order = {
    store: 'acme-widgets',
    orderID: chance.fbid(),
    customer: chance.name(),
    address: chance.address()
  };

  acmeVendor.publish('PICKUP', { messageID: chance.guid(), order});
}, 3000);

setInterval(() => {
  let order = {
    store: '1-800-flowers',
    orderID: chance.fbid(),
    customer: chance.name(),
    address: chance.address()
  };
  
  flowersVendor.publish('PICKUP', { messageID: chance.guid(), order});
}, 5000);

acmeVendor.subscribe('DELIVERED', payload => {
  if (payload.order.store === 'acme-widgets') {
    console.log('VENDOR: Thank you for delivering order', payload.order.orderID);
  }
});

acmeVendor.subscribe('RECEIVED', () => {
  console.log('VENDOR: Thank you for my messages from the queue');
});

flowersVendor.subscribe('DELIVERED', payload => {
  if (payload.order.store === '1-800-flowers') {
    console.log('VENDOR: Thank you for delivering order', payload.order.orderID);
  }
});

flowersVendor.subscribe('RECEIVED', () => {
  console.log('VENDOR: Thank you for my messages from the queue');
});