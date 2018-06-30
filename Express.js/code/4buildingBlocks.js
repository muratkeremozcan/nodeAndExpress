var express = require('express'); // this is the express library. install express in shell for this to work  :  npm install --save express. This installs the module and adds to package.json (our dependencies file)
var app = express(); // with the above we get a function back, when we run the function we get an application instance which we store in the app variable to create an instance of express.
var bodyParser = require('body-parser'); // parsing depends on middleware not shipped with express. npm install body-parser -g before you do this
var parseUrlencoded = bodyParser.urlencoded({ extended: false }); // urlEncoded function set to false forces the use of the native querystring Node library. The return value is an encoded function which we store in parseUrlencoded
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

// SECTION 4, creating a POST route
app.post('/blocks', parseUrlencoded, function(request, response) { // routes can take multiple handlers as arguments and will call them sequentially. 
    // parseUrlencoded will run first, our anonymous function will run second
    // using multiple route handlers is useful for re-using middleware that load resources, perfrom validation, authentication etc. 
    var newBlock = request.body; // request.body returns form data. Inside of a route, formdata is available in the request.body object. We create a variable newBlock and assign it the request.body object
    blocks[newBlock.name] = newBlock.description; // each element in the form becomes a property in the object (name and description) we use those to add a new block to the blocks object.
    response.status(201).json(newBlock.name); // we set to status code to 201 CREATED status code. and the response body to the new block name
});


app.get('/locations', function(request, response) { // the app.get function creates a route that accepts GET requests. When someone does a get request, it's going to call the  callback function (actively waiting)

    var location = locations[request.blockName]; // NEW: we can read properites on request which were set on app.param

    response.json(Object.keys(location)); //  responding with description and proper status code, defaults to 200 success status code, the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes

});

app.get('/blocks/:name', function(request, response) { // the app.get function creates a route that accepts GET requests. When someone does a get request, it's going to call the  callback function (actively waiting)

    var description = blocks[request.blockName]; // NEW: we can read properites on request which were set on app.param

    if (!description) { // we must return a 404 not found status code and an informative message when a block is not found
        response.status(404).json('No description found for ' + request.params.name); // use the status function to set it to 404 Not found status code. Respond with a custon JSON error message
    } else { // when we have a description go here
        response.json(description); //  responding with description and proper status code, defaults to 200 success status code, the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes
    }

});

app.delete('/blocks/:name', function(request, response) { // we create a delete route by calling our delete function, passing in the url path , the delete route also takes block name as the argument colon name
    delete blocks[request.blockName]; // the delete operator removes a property from an object. This is where we set the blockName  app.param('name')
    response.sendStatus(200); // we call the send status function with 200 status code. we use sendStatus when we don't want to manually set a response body. This function does it automatically for us based on the status code we use for the argument.
});

app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});
