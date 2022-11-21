'use strict';

const config = require('config');

const app = require('./app');

const port = config.get('server.port');

const utils = require('./utils');

const {getConnection} = utils.DB;

getConnection();
setupGlobals();

const server = app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});

function setupGlobals() {
  global.Utils = utils;
}

module.exports = server;
