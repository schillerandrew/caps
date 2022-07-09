'use strict';

const  { io }  = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

jest.mock('../server/index.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn()
  }
})

describe('Server testing', () => {
  console.log = jest.fn();
  socket.emit = jest.fn();
  test('PICKUP', () => {
    socket.emit('PICKUP', '1');

    // expect(console.log).toHaveBeenCalledWith('')
    expect(socket.emit).toHaveBeenCalledWith('IN-TRANSIT', '1');
  })
})