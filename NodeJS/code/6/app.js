var express = require('express');
var app = express(); // initialize express application
var server = require('http').createServer(app); // create http server, dispatch request to express
var io = require('socket.io')(server); // require socket.io, allow it to use http server
// socket io and express sharing the http server
io.sockets.on('connection', function (client) { // listen for connection events inside socket.io
  console.log('Client connected.......');
  client.emit('messages', { // emit the messages event on our client (browser)
    hello: 'hellooooooooo world' // send the object hello world
  });
  client.on('join', function (name) { // create a join event
    client.set('nickname', name); // assume they will send a name variable when they join
    client.broadcast.emit('chat', name + ' joined the chat');
  });
  client.on('messages', function (message) { // listen for messages events from browser
    console.log(message); // log it out to console
    client.broadcast.emit('messages', data); // broadcast message to all clients
    client.emit('messages', { // emit the messages event on our client (browser)
    });
  });
});
app.get('/', function (req, res) { // serve the html file with sendFile function
  res.sendFile(__dirname + '/index.html');
});
server.listen(8080);
console.log('listening on port 8080');