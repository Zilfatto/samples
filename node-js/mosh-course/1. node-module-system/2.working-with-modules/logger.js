const url = 'https://mylogger.io/log';

function log(message) {
  // Send an HTTP request
  console.log(message);
}

module.exports.log = log;
// Or if exports only one thing
// module.exports = log;