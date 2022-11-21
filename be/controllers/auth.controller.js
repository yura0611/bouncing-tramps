'use strict';
const {notAuthorized} = require('../utils/error');
const {AuthService} = require('../services/index');
/**
 * @apiDefine AuthBase
 *
 * @apiPermission Admin
 *
 *
 *
 * @apiError UserNotAuthorized [401] Invalid user's token.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "'User unauthorized'",
 *       "status": "user_unauthorized",
 *       "http_code": 401
 *     }
 */
/**
 * @apiDefine AuthCreateOrCheckUser
 *
 * @apiBody {String}         token google ID_token
 *
 * @apiSuccess {String}      token             JWTtoken
 * @apiSuccess {Object}      user              User profile information
 * @apiSuccess {ObjectId}    user._id          User ObjectId
 * @apiSuccess {String}      user.firstName    Firstname of the User
 * @apiSuccess {String}      user.lastNAme     Lastname of the User
 * @apiSuccess {String}      user.picture      Avatar-Image
 * @apiSuccess {String}      user.email        Email of the User
 * @apiSuccess {String}      user.uid          Google_id of the User
 * @apiSuccess {String}      user.createdAt    created at DB
 * @apiSuccess {String}      user.updatedAt    User last update date.
 */

/**
 * @api  {post} /auth recive user data
 * @apiName CreateOrCheckUser
 * @apiDescription This route recive google token wich convert in user data, and response with jwt token and user  data
 * @apiGroup Auth
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *
 *      {
 *        "token": "sdvdsvfdvfdsbfsdb.some.token.vavarevrvsdvdvdae.",
 *         "user":
 *           {
 *           "_id": "507f191e810c19729de860ea",
 *            "uid": "1234564321234556",
              "firstName": "Test First Name",
             "lastName": "Test Last Name",
             "picture": "https://someurl.com",
             "email": "testEmail@techmagic.co",
             "createdAt": "2021-11-26T13:07:18.588Z",
             "updatedAt": "2021-11-26T13:07:18.588Z"
            }
 *      }
 *
 * @apiUse AuthBase
 * @apiUse AuthCreateOrCheckUser
 */
async function checkUser(req, res, next) {
  try {
    const {token} = req.body;
    const tokenAndUser = await AuthService.sigin_post(token);
    console.log(tokenAndUser);
    res.status(200).send({...tokenAndUser});
  } catch (e) {
    next(notAuthorized('User unauthorized', 'user_unauthorized'));
  }
}

module.exports = {
  checkUser
};
