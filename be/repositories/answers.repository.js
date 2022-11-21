'use strict';

const BaseRepository = require('./base.repository');
const {Answers} = require('../models');

class AnswersRepository extends BaseRepository {
  constructor() {
    super(Answers);
  }
}

module.exports = new AnswersRepository();
