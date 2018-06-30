var http = require('http'); // require module
http.createServer(function(request, response){  // REQUEST EVENT
  response.writeHead(200); // status code
  request.on('readable', function(chunk) { // listen to the readable event // declare a chunk variable
    while(null !== (chunk = request.read())) { // read a chunk from the request, if it's not null
      response.write(chunk); // echo back to the client the data we get in the request
    }
  });
  request.on('end', function() { // listen to the end event, when it fired..
    response.end(); // close the connection
  });
}).listen(8080); // listen for connections on this port

console.log('listening on port 8080..');