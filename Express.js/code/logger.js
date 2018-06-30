// our logger middleware will be called for each request, and before any of our routes
module.exports = function(request, response, next) { //module.exports makes the function public. CommonJS specification
// export default function(request, response, next) { // ES6 alternative
    var start = +new Date(); // we use the Date object to track the start time, store it in a variable start. + sign converts the date Object to milliseconds
    var stream = process.stdout; //writeable stream which we can access through the process.stdout property. Set this to variable stream to use it later.
    var url = request.url; // from the request object which got passed in as an argument to the function, we get the request url..
    var method = request.method; // .. and the http method used . We need the url and method to build our logger message

    response.on('finish', function() { // response object is an EventEmitter, which we can use to listen to events.
        // Here the event handler function runs asynchronously
        // the finish event is emitted when the response has been handed off to the OS
        var duration = +new Date() - start; // calculating the duration of the request
        var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n'; // method, url, duration assigned to message
        stream.write(message); // print the log message
    });
    next(); // moves the request to the next middleware in the stack
};