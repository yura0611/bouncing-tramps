'use strict';

const {topicsService} = require('../services');

/**
 * @apiDefine TopicsBase
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Authorization Auth token provided by firebase.
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
 * @api {get} /topics Get all topics
 * @apiName ListTopics
 * @apiDescription This route allows to list all topics.
 * @apiGroup Topics
 *
 * @apiSampleRequest /topics/
 *
 * @apiSuccess {Array} topics Topics array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "name": "topic1"
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse TopicsBase
 */
async function getList(req, res, next) {
  try {
    const topics = await topicsService.getList();

    res.json(topics);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getList
};
