const path = require('path');
const os = require('os');

// Very useful method for breaking down long paths
const pathObj = path.parse(__filename);
const pathObj2 = path.parse(__dirname);

console.log(pathObj);
console.log(pathObj2);


const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);