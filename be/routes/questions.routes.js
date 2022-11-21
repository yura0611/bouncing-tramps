'use strict';

const express = require('express');

const {QuestionsController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .all(middleware.Auth.verifyToken)
  .get(QuestionsController.getList)
  .post(QuestionsController.createQuestion);

router
  .route('/external')
  .all(middleware.externalVerify.verifyJwtToken)
  .get(QuestionsController.getAppQuestionList);

router.param('id', middleware.validateId);
router
  .route('/:id/can-edit')
  .all(middleware.Auth.verifyToken)
  .get(QuestionsController.canUpdateQuestion);
router.route('/:id').all(middleware.Auth.verifyToken).patch(QuestionsController.updateQuestion);

router
  .route('/:id/external/')
  .all(middleware.externalVerify.verifyJwtToken)
  .get(QuestionsController.getAppQuestion);

module.exports = router;
