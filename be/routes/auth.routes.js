'use strict';

const express = require('express');
const router = express.Router();
const {AuthController} = require('../controllers/index');

router.route('/login').post(AuthController.checkUser);

module.exports = router;
