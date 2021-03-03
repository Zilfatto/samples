const http = require('http');

// Very low level
// const server = http.createServer();
// server.on('connection', socket => {
//   console.log('New connetion', socket);
// });
// server.listen(3000);

// Common way
http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World!');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
    res.end();
  }
}).listen(3000);

console.log('Listening on port 3000...');