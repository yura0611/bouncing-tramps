'use strict';

const BaseRepository = require('./base.repository');
const {Topics} = require('../models');

class TopicsRepository extends BaseRepository {
  constructor() {
    super(Topics);
  }
}

module.exports = new TopicsRepository();
