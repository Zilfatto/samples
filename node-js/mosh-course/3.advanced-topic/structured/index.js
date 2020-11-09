const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const debug = require('debug')('app:startup');
const humans = require('./routes/humans');
const home = require('./routes/home');
const winston = require('winston');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
// Not compulsory, but, if I want to overwrite the path to templates
app.set('views', './views'); // default ./views

// Handling errors
process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});
// It's the same as
winston.handleExceptions(
  new winston.transports.File({ filename: 'uncaughtExceptions.log' }));


process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

// For logging into a file
winston.add(winston.transports.File, {
  filename: 'logFile.log',
  level: 'info'
});
Into DB
winston.add(winston.transports.MongoDB, {
  db: 'mongodb://localhost:27017/vidly',
  level: 'error'
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/humans', humans);
app.use('/', home);

// Configuratuon
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is enabled...');
  // Another way
  winston.info('Morgan is enabled');

  // For errors
  winston.error(err.message, err);
  winston.log('error', err);
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
}

app.use(logger);

// In shell for bash - export PORT=5000, for windows - set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));