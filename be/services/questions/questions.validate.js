'use strict';

const Joi = require('joi');

function validateCreateQuestion(payload) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(250).trim().required(),
    description: Joi.string().min(10).max(800).trim().required(),
    type: Joi.string().valid('code', 'text').required(),
    maxLength: Joi.number().required().min(15).max(480),
    topics: Joi.array().items(Joi.string().min(2).max(10).trim()).unique().min(1).max(5).required()
  });

  return Utils.Joi.validate(schema, payload);
}

function validateUpdateQuestion(payload) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(250).trim(),
    description: Joi.string().min(10).max(800).trim(),
    type: Joi.string().valid('code', 'text'),
    maxLength: Joi.number().min(15).max(480),
    topics: Joi.array().items(Joi.string().min(2).max(10).trim()).unique().min(1).max(5),
    isActive: Joi.boolean()
  });

  return Utils.Joi.validate(schema, payload);
}

module.exports = {
  validateCreateQuestion,
  validateUpdateQuestion
};
