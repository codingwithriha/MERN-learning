const path = require('path');

console.log(path.sep); // Outputs the platform-specific path segment separator

const filePath = path.join('/content', 'subfolder', 'test.txt');
console.log(filePath); // Outputs the joined path

const base = path.basename(filePath);
console.log(base); // Outputs the last portion of the path

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute); // Outputs the absolute path to the file