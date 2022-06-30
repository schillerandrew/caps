'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./queue');

// singleton
const server = new Server(PORT);

// namespace (http://localhost:3002/caps)
const messages = server.of('./caps');


