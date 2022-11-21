'use strict';

const {usersRepository} = require('../../repositories');

class UsersService {
  async getList(email) {
    if (!email) {
      throw Utils.Error.badRequest('Query param `email` is required', 'users.bad_request');
    }

    const query = {email: {$regex: new RegExp(`^${email}`, 'i')}};

    const users = await usersRepository.find(query).limit(5);

    return users.map(user => user.getUser());
  }

  async findUserByUid(uid) {
    const user = await usersRepository.findOne({uid});

    if (!user) {
      throw Utils.Error.notFound('User not found', 'users.not_found');
    }

    return user.getUser();
  }
}

module.exports = new UsersService();
