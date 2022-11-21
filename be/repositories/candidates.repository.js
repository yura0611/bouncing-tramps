'use strict';

const BaseRepository = require('./base.repository');
const {Candidates} = require('../models');

class CandidatesRepository extends BaseRepository {
  constructor() {
    super(Candidates);
  }
}

module.exports = new CandidatesRepository();
