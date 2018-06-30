var express = require('../../../../../../Users/ozcanm/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express'); //   npm install --save express. This installs the module and adds to package.json
var app = express(); // calling the express function gives us an application instance of express

app.get('/blocks', function(request, response) { // route blocks: When someone does a get request to route, it's going to call the  callback function
// we give it a path to route, which is /blocks here. The callback function will run each time our applications receives a get request on the blocks path
// NEW: we can limit the number of blocks returned
    var blocks = ['Fixed', 'Moveable', 'Rotating']; // we use request.params.name to look up the block's description. returns undefined when no property is found for a given block name

    if(request.query.limit >= 0) { // if there is a numeric value for limit in the URL
        response.json(blocks.slice(0, request.query.limit)); // return limited results
    } else { // if there isn't a numeric value for limit in the url
        response.json(blocks); // old code, return all blocks
    }
});
app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});
