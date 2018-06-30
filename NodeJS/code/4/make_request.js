var http = require('http');
// import http from 'http';

var makeRequest = function(message) {
  var options = {
    host: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST'
  };
  var request = http.request(options, function(response){
    response.on('data', function(data) {
      console.log(data); // log response body
    });
  });
  request.write(message); // begin request
  request.end(); // end request
};

module.exports = makeRequest;
// export default makeRequest;