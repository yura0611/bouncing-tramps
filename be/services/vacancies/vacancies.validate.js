'use strict';

const Joi = require('joi');
const {questionsRepository} = require('../../repositories');
const {ObjectId} = require('mongoose').Types;

function validateCreateVacancy(payload) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(200).trim().required(),
    description: Joi.string().min(10).max(800).trim().required(),
    link: Joi.string().uri().allow(''),
    type: Joi.string().valid('Web', 'Management', 'IOS', 'Android').required(),
    questions: Joi.array()
      .items(Joi.string().custom(Utils.Joi.customIdValidator))
      .unique()
      .min(1)
      .max(20)
      .required()
  });

  return Utils.Joi.validate(schema, payload);
}

function validateUpdateVacancy(payload) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(200).trim(),
    description: Joi.string().min(10).max(800).trim(),
    link: Joi.string().uri().allow(''),
    type: Joi.string().valid('Web', 'Management', 'IOS', 'Android'),
    isActive: Joi.boolean()
  });

  return Utils.Joi.validate(schema, payload);
}

async function checkTotalLength(questions) {
  const pipeline = [
    {
      $group: {
        _id: {
          $in: ['$_id', questions.map(id => new ObjectId(id))]
        },
        totalLength: {
          $sum: '$maxLength'
        }
      }
    }
  ];

  const aggregationResult = await questionsRepository.aggregate(pipeline);

  const [{totalLength}] = aggregationResult.filter(item => !!item._id);
  if (totalLength > Utils.constants.VACANCY_MAX_LENGTH) {
    throw Utils.Error.badRequest(
      'Vacancy max total length is 16 hours',
      'vacancy.validation_failed'
    );
  }
}

module.exports = {
  validateCreateVacancy,
  validateUpdateVacancy,
  checkTotalLength
};
