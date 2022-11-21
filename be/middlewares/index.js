'use strict';

module.exports = {
  Auth: require('./auth.middleware'),
  validateId: require('./validateId.middleware'),
  externalVerify: require('./external.middleware')
};
