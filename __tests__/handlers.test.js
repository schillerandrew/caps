'use strict';

const handleDriver = require ('../driver/handleDriver');
const handleVendor = require ('../vendor/handleVendor');
const Chance = require('chance');
const driverPickup = require('../driver/handleDriver');
const chance = new Chance();
const eventPool = require('../eventPool');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn()
  }
});

describe('Event handler testing', () => {

  console.log = jest.fn();

  test('Driver logs PICKUP', () => {
    let event = {
      event: 'pickup',
      time: '2022-07-07T05:05:39.330Z',
      payload: {
        store: 'Family Dollar Stores Inc.',
        orderID: '1000008281865774',
        customer: 'Jennie Chandler',
        address: '1133 Oveku Center'
      }
    }
    handleDriver(event);
    // driverPickup(event);
    // console.log(handleDriver(event));

    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 1000008281865774');

    expect(eventPool.emit).toHaveBeenCalledWith('IN-TRANSIT', `DRIVER: picked up {
      event: 'pickup',
      time: '2022-07-07T05:05:39.330Z',
      payload: {
        store: 'Family Dollar Stores Inc.',
        orderID: '1000008281865774',
        customer: 'Jennie Chandler',
        address: '1133 Oveku Center'
      }
    }`);
  })
})