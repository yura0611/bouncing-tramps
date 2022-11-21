'use strict';

const BaseRepository = require('./base.repository');
const {Users} = require('../models');

class UsersRepository extends BaseRepository {
  constructor() {
    super(Users);
  }
}

module.exports = new UsersRepository();
