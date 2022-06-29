'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

// singleton
const server = new Server(PORT);

// namespace
const caps = server.of('./caps');

