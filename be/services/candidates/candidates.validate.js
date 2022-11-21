'use strict';

const Joi = require('joi');

function validateCreateCandidate(payload) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required()
  });

  return Utils.Joi.validate(schema, payload);
}

module.exports = {
  validateCreateCandidate
};
