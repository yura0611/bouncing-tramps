'use strict';

const express = require('express');

const {VacanciesController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .all(middleware.Auth.verifyToken)
  .get(VacanciesController.getList)
  .post(VacanciesController.createVacancy);

router.param('id', middleware.validateId);
router
  .route('/:id')
  .all(middleware.Auth.verifyToken)
  .get(VacanciesController.getVacancy)
  .patch(VacanciesController.updateVacancy);

module.exports = router;
