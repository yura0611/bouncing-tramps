'use strict';

const BaseRepository = require('./base.repository');
const {Applications} = require('../models');

class ApplicationsRepository extends BaseRepository {
  constructor() {
    super(Applications);
  }
}

module.exports = new ApplicationsRepository();
