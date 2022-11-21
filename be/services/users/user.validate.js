'use strict';

const Joi = require('joi');

function validateCreateUser(payload) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    picture: Joi.string().uri(),
    uid: Joi.string().required(),
    email: Joi.string()
      .email()
      //   .regex(/\S+@techmagic.co/) //-- commented for testing. It was decided on a daily standUp
      .required()
  });

  return Utils.Joi.validate(schema, payload);
}

module.exports = {
  validateCreateUser
};
