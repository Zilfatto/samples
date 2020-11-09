const winston = require('winston');

module.exports = function (err, req, res, next) {
  const { errors } = err;
  if (errors) {
    return res.status(400).send(errors[Object.keys(errors)[0]].message);
  }
  winston.error(err.message, err);
  res.status(500).send('Something failed.');
};