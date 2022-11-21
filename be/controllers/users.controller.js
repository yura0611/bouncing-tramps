'use strict';

const {usersService} = require('../services');

/**
 * @apiDefine UsersBase
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Authorization Auth token.
 * @apiHeaderExample {json} Authorization Header Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     }
 *
 * @apiError UserNotAuthorized [401] Invalid user's token.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "User's token is invalid",
 *       "status": "user.invalid_token",
 *       "http_code": 401
 *     }
 */

/**
 * @api {get} /users Search users by email
 * @apiQuery email
 * @apiName ListUsers
 * @apiDescription This route allows to get first 5 users matched to query.
 * @apiGroup Users
 *
 * @apiSampleRequest /users
 *
 * @apiError InvalidQueryParams [400] Query Param email is required.
 *
 * @apiSuccess {Array} users Users array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "firstName": "Test First Name",
 *         "lastName": "Test Last Name",
 *         "picture": "https://someurl.com",
 *         "email": "testEmail@techmagic.co"
 *      },
 *      ...
 *     ]
 *
 * @apiUse UsersBase
 */

async function getList(req, res, next) {
  try {
    const {email} = req.query;

    const users = await usersService.getList(email);

    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @api {get} /users/me Get current user
 * @apiName CurrentUser
 * @apiDescription This route allows to get current user.
 * @apiGroup Users
 *
 * @apiSampleRequest /users/me
 *
 * @apiSuccess {ObjectId} _id          User id.
 * @apiSuccess {String}   firstName    User first name.
 * @apiSuccess {String}   lastName     User last name.
 * @apiSuccess {String}   picture      User avatar link.
 * @apiSuccess {String}   email        User email.
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "619a5d1dfb010b0ac0310f7b",
 *        "firstName": "Test First Name",
 *        "lastName": "Test Last Name",
 *        "picture": "https://someurl.com",
 *        "email": "testEmail@techmagic.co"
 *     }
 *
 * @apiUse UsersBase
 */

async function getUserByUid(req, res, next) {
  try {
    const {userUid} = req;

    const user = await usersService.findUserByUid(userUid);

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = {getList, getUserByUid};
