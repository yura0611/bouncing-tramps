'use strict';

const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('./routes'));
app.use('/docs', express.static(`${__dirname}/docs`));

app.use((err, req, res, next) => {
  const {http_code} = err;

  if (http_code) {
    res.status(http_code).json(err);
  } else {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

module.exports = app;
