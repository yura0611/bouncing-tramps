'use strict';

const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const {Users} = require('../../models/index');
const {validateCreateUser} = require('../users/user.validate');
const keys = require('../../config/autKeys.json');

async function sigin_post(token) {
  const client = new OAuth2Client(keys.google.CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: keys.google.CLIENT_ID
  });

  const payload = ticket.getPayload();
  const userid = payload['sub'];

  const data = await validateCreateUser({
    uid: userid,
    firstName: payload.given_name,
    lastName: payload.family_name,
    email: payload.email,
    picture: payload.picture
  });
  const jwtToken = jwt.sign({setJWTPassword: userid}, keys.jwt.secret, {expiresIn: '1d'});

  const currentUser = await Users.findOne({uid: userid});
  if (currentUser) {
    return {token: jwtToken, user: currentUser};
  }
  const newUser = await new Users(data).save();

  return {token: jwtToken, user: newUser};
}

module.exports = {
  sigin_post
};
