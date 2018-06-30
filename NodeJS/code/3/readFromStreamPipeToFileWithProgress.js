var fs = require('fs'); // require file system module
var http = require('http'); // require http module

http.createServer(function(request, response) { // read from the http request
  var newFile = fs.createWriteStream("largeFileCOPY.mp4"); // write stream to the file
  var fileBytes = request.headers['content-length']; // get the SIZE of the file
  var uploadedBytes = 0; // keep track of uploaded bytes

  request.on('readable', function(chunk) { // listen to the readable event
    while (null !== (chunk = request.read())) { // loop through and read each of the chunks
      uploadedBytes += chunk.length; // increment uploadedBytes by the length of each chunk
      var progress = (uploadedBytes/fileBytes) * 100; // calculate progress by dividing uploadedBytes by fileBytes
      response.write('progress: ' + parseInt(progress, 10) + '%\n'); // send the progress to the client with response.write
      // parseInt rounds progress to an integer
    }
  });
  request.pipe(newFile); // pipe the http request content to the new file
  request.on('end', function() { // listen to the end event
    response.end('uploaded'); // close the response, responding with string 'uploaded'
  });
}).listen(8080); // listen on port 8080
console.log('listening on port 8080\n');