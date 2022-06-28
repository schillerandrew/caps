'use strict';

const Chance = require('chance');
const chance = new Chance();

let randomPayload = {
  store: chance.company(),
  orderID: chance.fbid(),
  customer: chance.name(),
  address: chance.address()
}

// chance.name(); full name
// chance.address(); street address
// chance.fbid() id
// chance.company() store name

const dateAndTime = new Date();
console.log(dateAndTime);