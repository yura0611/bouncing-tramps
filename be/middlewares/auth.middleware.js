'use strict';

const {secret} = require('../config/autKeys.json').jwt;
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const {authorization} = req.headers;
    const [type, token] = authorization.split(' ').filter(item => !!item);
    if (type.toLowerCase() !== Utils.Enums.tokenTypes.BEARER) {
      throw Utils.Error.notAuthorized('User unauthorized', 'user_unauthorized');
    }
    const jt = jwt.verify(token, secret);
    req.userUid = jt.setJWTPassword;
    next();
  } catch (e) {
    next(Utils.Error.notAuthorized('User unauthorized', 'user_unauthorized'));
  }
}

module.exports = {verifyToken};
