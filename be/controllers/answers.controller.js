'use strict';

const {answersService} = require('../services');

/**
 * @apiDefine AnswersBase
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Authorization Auth token provided by Google OAuth 2.
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
 * @apiDefine AnswersExternal
 *
 * @apiPermission Candidate
 *
 * @apiHeader {String} Authorization JWT token genereted with create application entity.
 * @apiHeaderExample {json} Authorization Header Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     }
 *
 * @apiError UserNotAuthorized [401] Invalid token.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Invalid token",
 *       "status": "external.unautorized",
 *       "http_code": 401
 *     }
 */

/**
 * @apiDefine AnswerCreateOrUpdateExternal
 *
 * @apiBody {ObjectId} question            Id question for it answer is related.
 * @apiBody {String} candidateAnswer       Text answer of candidate.
 * @apiBody {Number} completionTime        Number from start execution in seconds.
 *
 * @apiSuccess {ObjectId} _id              Answer id.
 * @apiSuccess {ObjectId} application      Id application for it answer is related.
 * @apiSuccess {ObjectId} question         Id question for it answer is related.
 * @apiSuccess {ObjectId} candidate        Id candidate gives answer.
 * @apiSuccess {String} candidateAnswer    Text answer of candidate.
 * @apiSuccess {Number} completionTime     Number from start execution in seconds.
 * @apiSuccess {String} createdAt          Answer creation date.
 * @apiSuccess {String} updatedAt          Answer last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "_id": "6197dc0a640594148329d6d2",
 *         "application": "6197dc0a640594148329d6d2",
 *         "question": "61a2842e614ef6c92241ec70",
 *         "candidate": "6197dc0a640594148329d6d2",
 *         "candidateAnswer": "Test answer of test candidate",
 *         "completionTime": 171,
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      }
 *
 * @apiUse AnswersExternal
 */

/**
 * @apiDefine AnswerUpdate
 *
 * @apiBody {Number} reviewerRank          Mark of answer.
 *
 * @apiSuccess {ObjectId} _id              Answer id.
 * @apiSuccess {ObjectId} application      Id application for it answer is related.
 * @apiSuccess {ObjectId} question         Id question for it answer is related.
 * @apiSuccess {ObjectId} candidate        Id candidate gives answer.
 * @apiSuccess {ObjectId} reviewer         Id application reviewer.
 * @apiSuccess {String} candidateAnswer    Text answer of candidate.
 * @apiSuccess {Number} completionTime     Number from start execution in seconds.
 * @apiSuccess {Number} reviewerRank       Mark of answer (1-10)
 * @apiSuccess {String} status             Status of answer [Evaluated].
 * @apiSuccess {String} createdAt          Answer creation date.
 * @apiSuccess {String} updatedAt          Answer last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "_id": "6197dc0a640594148329d6d2",
 *         "application": "6197dc0a640594148329d6d2",
 *         "question": "61a2842e614ef6c92241ec70",
 *         "candidate": "6197dc0a640594148329d6d2",
 *         "reviewer": "6197dc0a640594148329d6d2",
 *         "candidateAnswer": "Test answer of test candidate",
 *         "completionTime": 171,
 *         "reviewerRank": 10,
 *         "status": "Evaluated",
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      }
 *
 * @apiUse AnswersBase
 */

/**
 * @apiDefine AnswersGet
 *
 * @apiSuccess {ObjectId} _id                         Answer id.
 * @apiSuccess {ObjectId} application                 Id application for it answer is related.
 * @apiSuccess {Object} question                      Object question for it answer is related.
 * @apiSuccess {ObjectId} candidate                   Id candidate gives answer.
 * @apiSuccess {ObjectId} reviewer                    Id application reviewer.
 * @apiSuccess {String} candidateAnswer               Text answer of candidate.
 * @apiSuccess {Number} completionTime                Number from start execution in seconds.
 * @apiSuccess {Number} [reviewerRank]                Mark of answer (1-10) (if reviewer made mark)
 * @apiSuccess {String} status                        Status of answer ["Evaluated", "Answered"]. (Value is "Answered" if reviewer have not marked answer)
 * @apiSuccess {String} createdAt                     Answer creation date.
 * @apiSuccess {String} updatedAt                     Answer last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "_id": "6197dc0a640594148329d6d2",
 *         "application": "6197dc0a640594148329d6d2",
 *         "question": {
 *            "_id": "61a2842e614ef6c92241ec70",
 *            "title": "Test Question?",
 *            "description": "Test Question Description",
 *            "type": "text",
 *            "maxLength": 600,
 *            "topics": [
 *              "Angular",
 *              "JavaScript",
 *              "Web",
 *              "Front-End"
 *            ],
 *            "isActive": true,
 *            "createdAt": "2021-11-21T14:52:13.509Z",
 *            "updatedAt": "2021-11-21T14:52:13.509Z"
 *         },
 *         "candidate": "6197dc0a640594148329d6d2",
 *         "reviewer": "6197dc0a640594148329d6d2",
 *         "candidateAnswer": "Test answer of test candidate",
 *         "completionTime": 171,
 *         "reviewerRank": 10,
 *         "status": "Evaluated",
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      }
 *
 * @apiUse AnswersBase
 */

/**
 * @api {get} /answers Get all answers
 * @apiQuery {ObjectId} applicationId
 * @apiName ListAnswers
 * @apiDescription This route allows to list all answers related to speciefic application.
 * @apiGroup Answers
 *
 * @apiError InvalidQueryParams [400] ObjectId is invalid.
 *
 * @apiSampleRequest /answers?applicationId=619a5d1dfb010b0ac0310f7b
 *
 * @apiSuccess {Array} answers Answers array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id": "6197dc0a640594148329d6d2",
 *         "application": "6197dc0a640594148329d6d2",
 *         "question": {
 *            "_id": "61a2842e614ef6c92241ec70",
 *            "title": "Test Question?",
 *            "description": "Test Question Description",
 *            "type": "text",
 *            "maxLength": 600,
 *            "topics": [
 *              "Angular",
 *              "JavaScript",
 *              "Web",
 *              "Front-End"
 *            ],
 *            "isActive": true,
 *            "createdAt": "2021-11-21T14:52:13.509Z",
 *            "updatedAt": "2021-11-21T14:52:13.509Z"
 *         },
 *         "candidate": "6197dc0a640594148329d6d2",
 *         "reviewer": "6197dc0a640594148329d6d2",
 *         "candidateAnswer": "Test answer of test candidate",
 *         "completionTime": 171,
 *         "reviewerRank": 10,
 *         "status": "Evaluated",
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse AnswersBase
 */

async function getList(req, res, next) {
  try {
    const applicationId = Utils.checkId(req.query.applicationId);

    const answers = await answersService.getList(applicationId);

    res.status(200).json(answers);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @api {get} /answers/:id Get answer
 * @apiName GetAnswer
 * @apiDescription This route allows to get answer by id.
 * @apiGroup Answers
 *
 * @apiSampleRequest /answers/6197dc0a640594148329d6d2
 *
 * @apiParam {ObjectId} id    Answers id.
 * @apiParamExample {string} Request Url Example:
 *     /api/answers/6197dc0a640594148329d6d2
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError AnswerNotFound [404] Answer not found.
 *
 * @apiUse AnswersGet
 */

async function getAnswerById(req, res, next) {
  try {
    const id = Utils.checkId(req.params.id);

    const answer = await answersService.findAnswerById(id);

    res.status(200).json(answer);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @api {patch} /answers/:id Update answer by set mark
 * @apiName UpdateAnswerByReviewer
 * @apiDescription This route allows to update answer by id.
 * @apiGroup Answers
 *
 * @apiSampleRequest /answers/6197dc0a640594148329d6d2
 *
 * @apiParam {ObjectId} id    Answer id.
 * @apiParamExample {string} Request Url Example:
 *     /api/answers/6197dc0a640594148329d6d2
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError AnswersNotFound [404] Answer not found.
 * @apiError InvalidBody [400] Body is invalid.
 * @apiError ForbiddenActionAnswer [403] Forbidden update answer.
 *
 * @apiUse AnswerUpdate
 */

async function markAnswer(req, res, next) {
  try {
    const id = Utils.checkId(req.params.id);

    const {body, userUid} = req;

    const answer = await answersService.markAnswer(id, userUid, body);

    res.status(200).json(answer);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @api {post} /answers/external Create a new answer
 * @apiName CreateAnswer
 * @apiDescription This route allows candidate create an new answer.
 * @apiGroup Answers
 *
 * @apiSampleRequest /answers/external
 *
 * @apiError InvalidBody [400] Body is invalid.
 * @apiError ForbiddenActionAnswer [403] Forbidden create answer.
 *
 * @apiUse AnswerCreateOrUpdateExternal
 */

async function createAnswer(req, res, next) {
  try {
    const {body, applicationId} = req;

    const answer = await answersService.createAnswer(body, applicationId);

    res.status(200).json(answer);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = {
  getList,
  getAnswerById,
  markAnswer,
  createAnswer
};
