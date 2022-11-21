'use strict';

const Joi = require('joi');

function validateCreateApplication(payload) {
  const schema = Joi.object({
    vacancy: Joi.string().custom(Utils.Joi.customIdValidator).required(),
    reviewer: Joi.string().custom(Utils.Joi.customIdValidator).required(),
    createdBy: Joi.string().custom(Utils.Joi.customIdValidator).required(),
    executor: Joi.string().custom(Utils.Joi.customIdValidator).required(),
    status: Joi.string()
      .valid(...Object.values(Utils.Enums.applicationsStatuses))
      .required()
  });

  return Utils.Joi.validate(schema, payload);
}

function validateUpdateApplicationReviewer(payload) {
  const schema = Joi.object({
    reviewer: Joi.string().custom(Utils.Joi.customIdValidator).required()
  });

  return Utils.Joi.validate(schema, payload);
}

function validateUpdateApplication(payload) {
  const schema = Joi.object({
    score: Joi.number().min(0).max(100).required()
  });

  return Utils.Joi.validate(schema, payload);
}

module.exports = {
  validateCreateApplication,
  validateUpdateApplicationReviewer,
  validateUpdateApplication
};
