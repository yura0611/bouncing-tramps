'use strict';

const express = require('express');

const {UsersController} = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.route('/').all(middleware.Auth.verifyToken).get(UsersController.getList);

router.route('/me').all(middleware.Auth.verifyToken).get(UsersController.getUserByUid);

module.exports = router;
