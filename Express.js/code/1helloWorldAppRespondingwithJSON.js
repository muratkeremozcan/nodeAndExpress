var express = require('express'); // this is the express library. 
var app = express(); // calling the express function gives us an application instance of express

// the app.get function creates a route that accepts GET requests
app.get('/blocks', function(request, response) { // When someone does a get request, it's going to call the  callback function (actively waiting)
    // we give it a path to route, which is the BLOCKS.The callback function will run each time our applications receives a get request on the root path 

    // RESPONDING WITH JSON
    // var blocks = ['Fixed', 'Movable', 'Rotating']; // inside the blocks ROUTE create an array with 3 elements, assign to blocks variable

    // what if instead of an array we pass in a string  . Express sends the string as is. Nothing special here.
    var blocks = '<ul><li>Fixed</li><li>Moveable</li></ul>';

    // response.send(blocks); // the send function converts objects and arrays to JSON
    // response.json(blocks); // same response as send, BUT ONLY IN JSON 

    // REDIRECTING
    response.redirect('/parts');
    // response.redirect(301, '/parts'); // the redirect function sets thh proper response headers. 301 is the optional status code. 

});
app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});
