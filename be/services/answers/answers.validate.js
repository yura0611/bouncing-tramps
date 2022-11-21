'use strict';

const Joi = require('joi');

function validateMarkAnswer(payload) {
  const schema = Joi.object({
    reviewerRank: Joi.number().integer().min(0).max(10).required()
  });

  return Utils.Joi.validate(schema, payload);
}

function validateCreateAnswer(payload) {
  const schema = Joi.object({
    question: Joi.string().custom(Utils.Joi.customIdValidator).required(),
    candidateAnswer: Joi.string().max(1000).required(),
    completionTime: Joi.number().integer().min(0).required()
  });

  return Utils.Joi.validate(schema, payload);
}

module.exports = {
  validateMarkAnswer,
  validateCreateAnswer
};
