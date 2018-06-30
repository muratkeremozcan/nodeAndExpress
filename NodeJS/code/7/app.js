var express = require('express');
var app = express(); // initialize express application
var server = require('http').createServer(app); // create http server, dispatch request to express
var io = require('socket.io')(server); // require socket.io, allow it to use http server
// socket io and express sharing the http server
var messages = []; // store messages in an array
var storeMessage = function (name, data) { // add message to the end of array
  message.push({
    name: name,
    data: data
  });
  if (messages.length > 10) {
    messages.shift(); // if more than 10 messages, remove the first
  }
};
io.sockets.on('connection', function (client) { // listen for connection events inside socket.io
  console.log('Client connected.......');
  client.emit('messages', { // emit the messages event on our client (browser)
    hello: 'hellooooooooo world' // send the object hello world
  });
  client.on('join', function (name) { // create a join event
    client.set('nickname', name); // assume they will send a name variable when they join
    client.broadcast.emit('chat', name + ' joined the chat'); // when a new client joins
    messages.forEach(function (message) { // iterate through each of the messages
      client.emit('messages', message.name + ': ' + message.data); // and emit a message...
    });  // ... on the connecting client for each one
  });
  client.on('messages', function (message) { // listen for messages events from browser
    client.get('nickname', function (error, name) {
      client.broadcast.emit('messages', data); // broadcast message to all clients
      client.emit('messages', name + ': ' + message); // emit the messages event on our client (browser)
      storeMessage(name, message); // when client sends a message, call storeMessage
    });
  });
});
app.get('/', function (req, res) { // serve the html file with sendFile function
  res.sendFile(__dirname + '/index.html');
});
server.listen(8080);
console.log('listening on port 8080');