var fs = require('fs'); // require file system module

var file = fs.createReadStream('readme.md'); // create a read stream from the file, store to a variable
var newFile = fs.createWriteStream('readme_copy.md'); // create a write stream to the destination file, store to a variable

file.pipe(newFile); // pipe to thd new file