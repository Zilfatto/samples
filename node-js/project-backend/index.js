const winston = require('winston');
const config = require("config");
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/db')();
require('./startup/config')(app);
require('./startup/validation')();
require('./startup/routes')(app);

// In shell for bash - export PORT=5000, for windows - set PORT=5000
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;