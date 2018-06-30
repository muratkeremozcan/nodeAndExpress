var express = require('express'); //   npm install --save express. This installs the module and adds to package.json
var app = express(); // calling the express function gives us an application instance of express
var logger = require('./logger'); // require the logger we wrote ./ indicates it's a local module , not NPM module

app.use(express.static('public')); // app.use function adds middleware to the application stack
// We pass it the public folder where we want to serve our static files from
// this basically enables us to use the files in the public folder
// static middleware by default serves index.html

app.use(logger); // use the logger . Add it to the stack by passing it as and argument to app.use

app.get('/blocks', function(request, response) { // route blocks: When someone does a get request to route, it's going to call the  callback function
    var blocks = ['Fixed', 'Movable', 'Rotating']; // creating an array of blocks . 
    response.json(blocks); // serializing it back to the client using the response.json function
});
app.listen(3000, function() {
    console.log('listening on port 3000');
}); // listen on port 3000`