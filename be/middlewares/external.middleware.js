'use strict';
// TODO: Introduce separate key for candidate jwt verification
const {secret} = require('../config/externalJWTKeys.json').jwt;
const jwt = require('jsonwebtoken');

function verifyJwtToken(req, res, next) {
  try {
    const {authorization} = req.headers;
    const [type, token] = authorization.split(' ').filter(item => !!item);
    if (type.toLowerCase() !== Utils.Enums.tokenTypes.BEARER) {
      throw Utils.Error.notAuthorized('User unauthorized', 'user_unauthorized');
    }
    const decoded = jwt.verify(token, secret);
    req.applicationId = decoded.applicationId;
    next();
  } catch (e) {
    next(Utils.Error.notAuthorized('Token Invalid', 'external.unautorized'));
  }
}

module.exports = {verifyJwtToken};
