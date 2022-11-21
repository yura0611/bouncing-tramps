'use strict';

const express = require('express');

const {AnswersController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.route('/').all(middleware.Auth.verifyToken).get(AnswersController.getList);

router
  .route('/external')
  .all(middleware.externalVerify.verifyJwtToken)
  .post(AnswersController.createAnswer);

router
  .route('/:id')
  .all(middleware.Auth.verifyToken)
  .get(AnswersController.getAnswerById)
  .patch(AnswersController.markAnswer);

module.exports = router;
