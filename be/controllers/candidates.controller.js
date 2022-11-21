'use strict';

const {candidatesService} = require('../services');

/**
 * @apiDefine CandidatesBase
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
 * @api {get} /candidates Search candidates by email
 * @apiQuery {String} email
 * @apiName ListCandidates
 * @apiDescription This route allows to get first 5 candidates matched to query.
 * @apiGroup Candidates
 *
 * @apiSampleRequest /candidates
 *
 * @apiError InvalidQueryParams [400] Query Param email is required.
 *
 * @apiSuccess {Array} candidates Candidates array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "firstName": "Test First Name",
 *         "lastName": "Test Last Name",
 *         "email": "sampleEmail@domain.com",
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse CandidatesBase
 */

async function getList(req, res, next) {
  try {
    const {email} = req.query;

    const candidates = await candidatesService.getList(email);

    res.status(200).json(candidates);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = {getList};
