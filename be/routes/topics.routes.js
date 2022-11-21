'use strict';

const express = require('express');

const {TopicsController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.route('/').all(middleware.Auth.verifyToken).get(TopicsController.getList);

module.exports = router;
