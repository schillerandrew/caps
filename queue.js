'use strict';

class Queue{
  constructor(){
    this.data = {};
  }

  save(key, value){
    this.data[key] = value;
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    console.log('>>> Something was just deleted');
    let deletedValue = this.data[key];
    delete this.data[key];
    return deletedValue;
  }
}

module.exports = Queue;