'use strict';

class Queue{
  constructor(){
    this.data = {};
  }

  save(key, value){
    console.log('>>> Something was stored');
    this.data[key] = value;
    return key;
  }

  read(key){
    console.log('>>> Something was read');
    return this.data[key];
  }

  remove(key){
    console.log('>>> Something was deleted');
    let deletedValue = this.data[key];
    delete this.data[key];
    return deletedValue;
  }
}

module.exports = Queue;