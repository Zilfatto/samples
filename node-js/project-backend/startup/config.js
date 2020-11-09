const config = require('config');
const morgan = require('morgan');
const winston = require('winston');

module.exports = function (app) {
  if (!config.get('jwtPrivateKey')) {
    // throw new Error('FATAL ERROR: jwtPrivatrKey is not defined.');
  }

  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    winston.info('Morgan is enabled...');
  }
};