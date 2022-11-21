'use strict';

const express = require('express');

const {CandidatesController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.route('/').all(middleware.Auth.verifyToken).get(CandidatesController.getList);

module.exports = router;
