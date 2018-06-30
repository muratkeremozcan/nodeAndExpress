var express = require('express');
var app = express();

app.get('/', function(request, response) { //  / for root route
  response.sendFile(__dirname + '/index.html');  //  __dirname for current directory
});
app.listen(8080);