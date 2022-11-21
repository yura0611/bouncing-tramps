'use strict';

const express = require('express');

const router = express.Router();

router.get('/hc', (req, res) => res.json({status: 'ok'}));
router.use('/auth', require('./auth.routes'));
router.use('/vacancies', require('./vacancies.routes'));
router.use('/users', require('./users.routes'));
router.use('/candidates', require('./candidates.routes'));
router.use('/questions', require('./questions.routes'));
router.use('/applications', require('./applications.routes'));
router.use('/topics', require('./topics.routes'));
router.use('/answers', require('./answers.routes'));

module.exports = router;
