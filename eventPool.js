'use strict';

const Event = require('events');

// event singleton
const eventPool = new Event();

module.exports = eventPool;