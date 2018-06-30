var express = require('express'); // this is the express library. 
var app = express(); // calling the express function gives us an application instance of express

// the app.get function creates a route that accepts GET requests
app.get('/', function(request, response) { // When someone does a get request, it's going to call the  callback function (actively waiting)
    // we give it a path to route, which is the root path here. The callback function will run each time our applications receives a get request on the root path 

    // response.send('Hello World');  // EXPRESS function
    response.write('Hello world'); // NODE functions  // we use the response object to send back the text 'hello world'
    response.end();
});
app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});
