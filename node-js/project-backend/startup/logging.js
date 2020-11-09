const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/uncaughtExceptions.log' })
  );

  // winston.rejections.handle(
  //   new winston.transports.File({ filename: 'logs/unhandledRejections.log' })
  // );

  winston.add(new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
  // For logging into a file
  winston.add(new winston.transports.File({
    filename: 'logs/logFile.log',
    level: 'info'
  }));

  // Into DB
  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost:27017/vidly',
    level: 'error'
  }));
};