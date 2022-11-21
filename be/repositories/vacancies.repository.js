'use strict';

const BaseRepository = require('./base.repository');
const {Vacancies} = require('../models');

class VacanciesRepository extends BaseRepository {
  constructor() {
    super(Vacancies);
  }
}

module.exports = new VacanciesRepository();
