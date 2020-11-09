const fs = require('fs');

// Sync form
const files = fs.readdirSync('./');
console.log(files);
// Async form
fs.readdir('./', (err, files) => {
  if (err) console.log('Error', err);
  else console.log('Result', files);
});
// They will give an string array