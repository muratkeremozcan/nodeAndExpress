var express = require('express'); // this is the express library. install express in shell for this to work  :  npm install --save express. This installs the module and adds to package.json (our dependencies file)
var app = express(); // with the above we get a function back, when we run the function we get an application instance which we store in the app variable to create an instance of express.

app.use(express.static('public')); // app.use function adds middleware to the application stack. We pass it the public folder where we want to serve our static files from 
// this basically enables us to use the files in the public folder

var blocks = require('./routes/blocks'); // NEW our router is simply a node module and can be required like so
app.use('/blocks', blocks); // NEW then we mount our /blocks route in our blocks path. All requests to the /blocks url are dispatched to the blocks router

app.listen(3000, function() { // bind application to tcp port 3000. The listen also takes an optional callback function, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000 ');
});