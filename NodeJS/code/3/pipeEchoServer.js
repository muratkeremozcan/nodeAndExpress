var http = require('http'); // require module
http.createServer(function(request, response){  // REQUEST EVENT
  response.writeHead(200); // status code
  request.pipe(response); // SAME THING WITH PIPE
}).listen(8080); // listen for connections on this port

console.log('listening on port 8080..');