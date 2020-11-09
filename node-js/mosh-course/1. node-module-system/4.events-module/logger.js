const EventEmitter = require('events');

const url = 'https://www.smth.com';

class Logger extends EventEmitter {
  log(message) {
    // Send an HTTP request
    console.log(message);
    // Raise an event
    this.emit('messageLogged', { id: 1, url });
  }
}

module.exports = Logger;