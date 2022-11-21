'use strict';

const express = require('express');

const {ApplicationsController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .all(middleware.Auth.verifyToken)
  .get(ApplicationsController.getApplicationsByVacancy)
  .patch(ApplicationsController.updateApplicationReviewer)
  .delete(ApplicationsController.deleteApplication)
  .post(ApplicationsController.createApplication);

router
  .route('/assigned')
  .all(middleware.Auth.verifyToken)
  .get(ApplicationsController.getApplicationsByStatus);

router
  .route('/external')
  .all(middleware.externalVerify.verifyJwtToken)
  .get(ApplicationsController.getApplicationTitle);

router
  .route('/external/submit')
  .all(middleware.externalVerify.verifyJwtToken)
  .patch(ApplicationsController.changeApplicationStatus);

router.param('id', middleware.validateId);
router
  .route('/:id')
  .all(middleware.Auth.verifyToken)
  .get(ApplicationsController.getApplication)
  .patch(ApplicationsController.updateApplication);

module.exports = router;
