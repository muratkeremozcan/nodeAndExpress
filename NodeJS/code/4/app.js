var hello = require('./custom_hello').default;
var gb = require('./custom_goodbye');

hello();
// gb.goodbye;
gb.goodbye();
require('./custom_goodbye').goodbye();