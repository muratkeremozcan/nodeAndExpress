// SECTION 5.2 dedicated routes can help organize our code. 
// all block-related logic is encapsulated inside its routes file

var express = require('express'); // this is the express library. install express in shell for this to work  :  npm install --save express. This installs the module and adds to package.json (our dependencies file)
// NEW SECTION 5.2
var router = express.Router(); // Router functions returns a router instance which can be mounted as a middleware
var bodyParser = require('body-parser'); // parsing depends on middleware not shipped with express. npm install body-parser -g before you do this
var parseUrlencoded = bodyParser.urlencoded({ extended: false }); // urlEncoded function set to false forces the use of the native querystring Node library. The return value is an encoded function which we store in parseUrlencoded

var blocks = { // making this an object enables it to be accessed from other sources in the file
    'Fixed': 'Fastened securely in position', // property name + description 
    'Movable': 'Capable of being moved',
    'Rotating': ' Moving in a cirlce around its center'
};

router.route('/') // the root path relative to the path where it's mounted in our  in our app.j file. USED TO BE    app.route('/blocks');
    // all paths here are assumed to be nested under /blocks
    // routes are moved from the app.js fie

.get(function(request, response) {
        var description = blocks[request.blockName]; // NEW: we can read properites on request which were set on app.param

        response.json(Object.keys(blocks)); // NEWresponding with object instead of Array breaks the code

    }) // removed the semicolon here so it continues on

.post(parseUrlencoded, function(request, response) {
    // using multiple route handlers is useful for re-using middleware that load resources, perfrom validation, authentication etc.
    var newBlock = request.body; // inside of a route, formdata is available in the request.body object. We create a variable newBlock and assign it the request.body object
    blocks[newBlock.name] = newBlock.description; // each element in the form becomes a property in the object (name and description) we use those to add a new block to the blocks object.
    response.status(201).json(newBlock.name); // we set to status code to 201 CREATED status code. and the response body to the new block name
});

router.route('/:name') // USED TO BE    app.route('/blocks/:name'); // all paths here are assumed to be nested under /blocks
    .all(function(request, response, next) { //  called for all requests for a given path, alternative to app.param('/name)
        var name = request.params.name; // these are going to be used in app.gets
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase(); // assign to the variable the normalized name of the block. Convert first char to uppercase, and lowercase the rest of the characters 

        request.blockName = block; // properties on the request object can be accessed from all subsequent routes in the application
        next(); // we call next so the request can move on to the next function in the stack 
    })

.get(function(request, response) {
        var description = blocks[request.blockName]; // NEW: we can read properites on request which were set on app.param

        if (!description) { // we must return a 404 not found status code and an informative message when a block is not found
            response.status(404).json('No description found for ' + request.params.name); // use the status function to set it to 404 Not found status code. Respond with a custon JSON error message
        } else { // when we have a description go here
            response.json(description); //  responding with description and proper status code, defaults to 200 success status code, the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes
        }

    }) // removed the semicolon for chaining function calls

//app.delete('/blocks/:name', function(request, response) { // we create a delete route by calling our delete function, passing in the url path , the delete route also takes block name as the argument colon name
.delete(function(request, response) {
    delete blocks[request.blockName]; // the delete operator removes a property from an object. This is where we set the blockName  app.param('name')
    response.sendStatus(200); // we call the send status function with 200 status code. we use sendStatus when we don't want to manually set a response body. This function does it automatically for us based on the status code we use for the argument.
});

module.exports = router; // we assign the router to module.exports to make it accessible from other files