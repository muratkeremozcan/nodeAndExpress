var fs = require('fs'); // require file system module
var http = require('http'); // require http module

http.createServer(function(request, response) { // read from the http request
  var newFile = fs.createWriteStream("readme_copy.md"); // write stream to the file DESTINATION
  request.pipe(newFile); // pipe the http request content to the new file

  request.on('end', function() { // listen to the end event
    response.end('uploaded'); // close the response, responding with string 'uploaded'
  });
}).listen(8080); // listen on port 8080
console.log('listening on port 8080\n');