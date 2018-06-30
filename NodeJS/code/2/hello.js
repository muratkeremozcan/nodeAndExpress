var EventEmitter = require('events').EventEmitter; // require EventEmitter module

var logger = new EventEmitter();  // can emit events: error , warn, info  

logger.on('error', function(message) {
  console.log('ERR: ' + message); // on ERROR EVENT, run this callback
});
logger.emit('error', 'Spilled Milk');
logger.emit('error', 'Eggs Cracked');

// console.log('listening on port 8080..');