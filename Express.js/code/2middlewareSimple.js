// middleware are the building blocks of express
// middleware are functions added to the stack, that have access to request and response objects and are executed sequentially
// inside the middleware we can do things like validation, authentication, data parsing etc.
// when a request comes in it passes through each middleware before reaching our routes
// an express application is essentially a stack of middleware
// call  next() to move to the next middleware

var express = require('express'); //   npm install --save express. This installs the module and adds to package.json
var app = express(); // calling the express function gives us an application instance of express

app.get('/', function(request, response) { // When someone does a get request, it's going to call the  callback function (actively waiting)
    response.sendFile(__dirname + '/public/index.html'); // ..use the sendFile function. Takes the path of the file we want to serve.
    // __dirname returns the current path of the app, this causes index.html file to be served back to the client
});
app.listen(3000, function() {
    console.log('listening on port 3000');
}); // listen on port 3000`