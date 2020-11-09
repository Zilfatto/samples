const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.addListener('messageLogged', () => {
  console.log('Logged from "addListener"');
});

emitter.on('messageLogged', () => {
  console.log('Logged from "on"');
});

// Raise an event
// Order matters! When "emit" gets called it iterates over all regestered listeners and calls them synchronously
emitter.emit('messageLogged');
// "Emit" - making a noise, produce something

// Event arguments

emitter.on('messageLogged', arg => { // or called - e, eventArg
  console.log(`Logged from "on" ${arg}`);
});

emitter.emit('Emitted', { id: 1, url: 'http://smth' });