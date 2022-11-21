'use strict';

const {badRequest} = require('./error');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  validate: (schema, payload) =>
    schema.validateAsync(payload).catch(e => {
      throw badRequest(e.message, 'validation_failed');
    }),
  customIdValidator: (id, helper) => {
    if (!ObjectId.isValid(id)) {
      return helper.message(`${id} is not valid ObjectId`);
    }

    return id;
  }
};
