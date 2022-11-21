'use strict';

const config = require('config');
const mongoose = require('mongoose');

const srv = config.get('database.srv');

mongoose.Promise = global.Promise;

async function getConnection() {
  const {NODE_ENV, MONGODB_URI} = process.env;
  const uri = MONGODB_URI || srv;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 3000
  };

  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connection.on('connected', () => console.log('Mongoose connection is CONNECTED'));
  mongoose.connection.on('error', err => console.error('Mongoose connection error:', err.message));
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is DISCONNECTED'));

  await mongoose.connect(uri, options);
}

module.exports = {getConnection};
