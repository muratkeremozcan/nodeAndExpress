var express = require('express'); //   npm install --save express. This installs the module and adds to package.json
var app = express(); // calling the express function gives us an application instance of express

// we put blocks out here

// in order to store additional information on blocks, we'll move them from an JS Array to JS object
var blocks = { // making this an object enables it to be accessed from other sources in the file
    'fixed': 'Fastened securely in position', // property name + description 
    'movable': 'Capable of being moved',
    'rotating': ' Moving in a circle around its center'
};

app.get('/blocks/:blockName', function(request, response) { // route blocks: When someone does a get request to route, it's going to call the  callback function
    // we give it a path to route, which is /blocks here. The callback function will run each time our applications receives a get request on the blocks path

    // NEW: We can use meaningful URLs to return the description for specific types of Blocks. 
    // The answer is using DYNAMIC ROUTES : placeholders can be used to name arguments part of the URL path
    // here adding  .../:name' creates name property on the request.params object ( request.params.name )

    var blockDescription = blocks[request.params.blockName]; // we use request.params.name to look up the block's description. returns undefined when no property is found for a given block name
    // this is like saying give value of : blocks[fixed]

    if (!blockDescription) { // we must return a 404 not found status code and an informative message when the block is not found (ex: banana)
        response.status(404).json('No description found for ' + request.params.blockName); // use the status function to set it to 404 Not found status code. Respond with a custom JSON error message
    } else { // when we have a description go here
        response.json(blockDescription); //  responding with description and proper status code, defaults to 200 success status code,
    }
});
app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});