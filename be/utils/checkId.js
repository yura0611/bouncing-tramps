'use strict';

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = id => {
  if (!ObjectId.isValid(id)) {
    throw Utils.Error.badRequest('ObjectId is invalid', 'validation_failed');
  }

  return id;
};
