var express = require('express'); // this is the express library. install express in shell for this to work  :  npm install --save express. This installs the module and adds to package.json (our dependencies file)
var app = express(); // with the above we get a function back, when we run the function we get an application instance which we store in the app variable to create an instance of express.

app.use(express.static('public')); // app.use function adds middleware to the application stack. We pass it the public folder where we want to serve our static files from 
// this basically enables us to use the files in the public folder

// we put blocks out here
// var blocks = ['Fixed', 'Movable', 'Rotating']; // inside the blocks ROUTE create an array with 3 elements, assign to blocks variable
// in order to store additional informatino on blocks, we'll move them from an JS Array to JS object
var blocks = { // making this an object enables it to be accessed from other sources in the file
    'Fixed': 'Fastened securely in position', // property name + description 
    'Movable': 'Capable of being moved',
    'Rotating': ' Moving in a cirlce around its center'
};

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

// NEW  what if we need to create DYNAMIC ROUTES that need to use the same parameter parsing? 
// we can parameterize commonly used variables
app.param('name', function(request, response, next) { // the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes. Called for routes which include the :name placeholder
    var name = request.params.name; // these are going to be used in app.gets
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase(); // assign to the variable the normalized name of the block. Convert first char to uppercase, and lowercase the rest of the characters 

    request.blockName = block; // properties on the request object can be accessed from all subsequent routes in the application
    next(); // we call next so the request can move on to the next function in the stack 
});

app.get('/blocks', function(request, response) { // the app.get function creates a route that accepts GET requests. When someone does a get request, it's going to call the  callback function (actively waiting)

    var description = blocks[request.blockName]; // NEW: we can read properites on request which were set on app.param

    response.json(Object.keys(blocks)); // NEWresponding with object instead of Array breaks the code

});

app.get('/locations', function(request, response) { // the app.get function creates a route that accepts GET requests. When someone does a get request, it's going to call the  callback function (actively waiting)

    var location = locations[request.blockName]; // NEW: we can read properites on request which were set on app.param

    response.json(Object.keys(location)); //  responding with description and proper status code, defaults to 200 success status code, the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes

});


app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});

// to run it do curl http://localhost:3000/blocks/Fixed, http://localhost:3000/blocks/Movable
// now even  fixed  and movable  or camelCase works!


/*

    request.blockName = block; // properties set on the request object can be accessed from all subsequent routes in the application

    response.json(Object.keys(blocks)); //  responding with description and proper status code, defaults to 200 success status code, the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes
    // Object.keys function returns an array with the object's properties
*/