var express = require('express'); // this is the express library. install express in shell for this to work  :  npm install --save express. This installs the module and adds to package.json (our dependencies file)
var app = express(); // with the above we get a function back, when we run the function we get an application instance which we store in the app variable to create an instance of express.

// we put blocks out here
// var blocks = ['Fixed', 'Movable', 'Rotating']; // inside the blocks ROUTE create an array with 3 elements, assign to blocks variable
// in order to store additional informatino on blocks, we'll move them from an JS Array to JS object
var blocks = { // making this an object enables it to be accessed from other sources in the file
    'Fixed': 'Fastened securely in position', // property name + description 
    'Movable': 'Capable of being moved',
    'Rotating': ' Moving in a cirlce around its center'
};

app.use(express.static('public')); // app.use function adds middleware to the application stack. We pass it the public folder where we want to serve our static files from 
// this basically enables us to use the files in the public folder


app.get('/blocks/:blockName', function(request, response) { // the app.get function creates a route that accepts GET requests. When someone does a get request, it's going to call the  callback function (actively waiting)
    // we give it a path to route, which is /blocks here. The callback function will run each time our applications receives a get request on the blocks path 
    // NEW: We can use meaningful URLs to retrn the description for specific types of Blocks. The answer is using DYNAMIC ROUTES : placeholders can be used to name arguments part of the URL path
    // here adding  .../:name' creates name property on the request.params object ( request.params.name )

    var blockName = request.params.blockName;
    var formattedBlockName = blockName[0].toUpperCase() + blockName.slice(1).toLowerCase(); // assign to the variable the normalized name of the block. Convert first char to uppercase, and lowercase the rest of the characters 
    var blockDescription = blocks[formattedBlockName]; // block name is now in the same format a the properties in the blocks object

    if (!blockDescription) { // we must return a 404 not found status code and an informative message when a block is not found
        response.status(404).json('No description found for ' + request.params.name); // use the status function to set it to 404 Not found status code. Respond with a custon JSON error message
    } else { // when we have a description go here
        response.json(blockDescription); //  responding with description and proper status code, defaults to 200 success status code, the APP.PARAM function maps palceholders to callback functions. Useful for runnign pre-conditions on dynamic routes
    }
});
app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});

// to run it do curl http://localhost:3000/blocks/Fixed, http://localhost:3000/blocks/Movable
// now even  fixed  and movable  or camelCase works!