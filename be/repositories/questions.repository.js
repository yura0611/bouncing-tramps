'use strict';

const BaseRepository = require('./base.repository');
const {Questions} = require('../models');

class QuestionsRepository extends BaseRepository {
  constructor() {
    super(Questions);
  }
}

module.exports = new QuestionsRepository();
