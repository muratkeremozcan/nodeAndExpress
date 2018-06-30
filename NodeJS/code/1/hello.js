var http = require('http'); // require module

http.createServer(function(request, response){  // REQUEST EVENT
  response.writeHead(200); // status code
  response.write("Dog is running."); // response body
  setTimeout(function(){  // represents long running process  // TIMEOUT EVENT
    response.write("\nDog is done.\n");
    response.end(); // close the connection
  }, 5000);
}).listen(8080); // listen for connections on this port
http.createServer(function(request, response){  // REQUEST EVENT
  response.writeHead(200); // status code
  response.write("Dog is running."); // response body
  setTimeout(function(){  // represents long running process  // TIMEOUT EVENT
    response.write("\nDog is done.\n");
    response.end(); // close the connection
  }, 5000);
}).listen(8080);

console.log('listening on port 8080..');