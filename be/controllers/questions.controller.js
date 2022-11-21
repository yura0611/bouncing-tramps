'use strict';

const {questionsService} = require('../services');

/**
 * @apiDefine QuestionsBase
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
 * @apiDefine AppQuestionsBase
 *
 * @apiPermission Candidate
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
 * @api {get} /questions Get all active questions / Get questions of specific vacancy
 * @apiName ListQuestions
 * @apiDescription This route allows to list questions. To get questions of specific vacancy, pass 'vacancy' query parameter with id of vacancy (e.g. /questions?vacancy=619a5d1dfb010b0ac0310f7b)
 * @apiGroup Questions
 *
 * @apiQuery {String} [vacancy] Vacancy id.
 *
 * @apiSampleRequest /questions/
 *
 * @apiSuccess {Array} questions Questions array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "title": "Test 123",
 *         "type": "code",
 *         "description": "Test 123",
 *         "maxLength": 15,
 *         "topics": ["test", "test123"],
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse QuestionsBase
 */
async function getList(req, res, next) {
  try {
    const {vacancy} = req.query;

    const questions = await questionsService.getList(vacancy);
    res.json(questions);
  } catch (e) {
    next(e);
  }
}

/**
 * @api {get} /questions Get questions of specific application
 * @apiName ListAppQuestions
 * @apiDescription This route allows to list questions of specific application. Not answered questions' titles marked by null
 * @apiGroup Questions
 *
 * @apiSampleRequest /questions/external
 *
 * @apiSuccess {Array} questions Questions array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *         "title": "Question title 1"
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "type": "code",
 *         "maxLength": 15,
 *      },
 *      {
 *         "title": null
 *         "_id": "619a5d1d55010b0ac0310f7b",
 *         "type": "text",
 *         "maxLength": 25,
 *      },
 *      ...
 *     ]
 *
 * @apiUse AppQuestionsBase
 */
async function getAppQuestionList(req, res, next) {
  try {
    const questions = await questionsService.getAppQuestionList(req.applicationId);

    res.json(questions);
  } catch (e) {
    next(e);
  }
}

/**
 * @api {get} /questions Get question by id
 * @apiName GetQuestions
 * @apiDescription This route allows to get question of specific application by id.
 * @apiGroup Questions
 *
 * @apiSampleRequest /questions/:id/external
 *
 * @apiSuccess {Array} questions Questions array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "title": "Test 123",
 *         "type": "code",
 *         "description": "Test 123",
 *         "maxLength": 15,
 *         "isActive": true,
 *         "topics": ["test", "test123"],
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      }
 *
 * @apiUse AppQuestionsBase
 */
async function getAppQuestion(req, res, next) {
  try {
    const {id} = req.params;

    const question = await questionsService.getAppQuestion(id);

    res.json(question);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine QuestionsCreate
 *
 * @apiBody {String} title                      Question title.
 * @apiBody {String} description                Question description.
 * @apiBody {String="code","text"} type         Question type.
 * @apiBody {Number} maxLength                  Question max time length.
 * @apiBody {String[]} topics                   Question topics, minimum 1 topic.
 *
 * @apiSuccess {ObjectId}             _id          Question id.
 * @apiSuccess {String}               title        Question title.
 * @apiSuccess {String="code","text"} type         Question type.
 * @apiSuccess {String}               description  Question description.
 * @apiSuccess {Number}               maxLength    Question max time length.
 * @apiSuccess {String[]}             topics       Question topics.
 * @apiSuccess {Boolean}              isActive     Question status
 * @apiSuccess {String}               createdAt    Question creation date.
 * @apiSuccess {String}               updatedAt    Question last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "title": "Test 123",
 *         "type": "code",
 *         "description": "Test 123",
 *         "maxLength": 15,
 *         "isActive": true,
 *         "topics": ["test", "test123"],
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      }
 */
/**
 * @api {post} /questions Create a new question
 * @apiName CreateQuestion
 * @apiDescription This route allows to create a new question.
 * @apiGroup Questions
 *
 * @apiUse QuestionsBase
 * @apiUse QuestionsCreate
 */
async function createQuestion(req, res, next) {
  try {
    const question = await questionsService.createQuestion(req.body);

    res.json(question);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine QuestionsUpdate
 *
 * @apiBody {String} [title]                      Question title.
 * @apiBody {String} [description]                Question description.
 * @apiBody {String="code","text"} [type]         Question type.
 * @apiBody {Number} [maxLength]                  Question max time length.
 * @apiBody {String[]} [topics]                   Question topics, minimum 1 topic.
 * @apiBody {Boolean} [isActive]                  Question status.
 *
 * @apiSuccess {ObjectId}             _id          Question id.
 * @apiSuccess {String}               title        Question title.
 * @apiSuccess {String="code","text"} type         Question type.
 * @apiSuccess {String}               description  Question description.
 * @apiSuccess {Number}               maxLength    Question max time length.
 * @apiSuccess {String[]}             topics       Question topics.
 * @apiSuccess {Boolean}              isActive     Question status
 * @apiSuccess {String}               createdAt    Question creation date.
 * @apiSuccess {String}               updatedAt    Question last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "_id": "619a5d1dfb010b0ac0310f7b",
 *         "title": "Test 123",
 *         "type": "code",
 *         "description": "Test 123",
 *         "maxLength": 15,
 *         "isActive": true,
 *         "topics": ["test", "test123"],
 *         "createdAt": "2021-11-21T14:52:13.509Z",
 *         "updatedAt": "2021-11-21T14:52:13.509Z"
 *      }
 */
/**
 * @api {patch} /questions/:id Update question
 * @apiName UpdateQuestions
 * @apiDescription This route allows to update question by id.
 * @apiGroup Questions
 *
 * @apiSampleRequest /questions/:id
 *
 * @apiParam {ObjectId} id    Question id.
 * @apiParamExample {string} Request Url Example:
 *     /api/questions/507f1f77bcf86cd799439011
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError QuestionsNotFound [404] Question not found.
 *
 * @apiUse QuestionsBase
 * @apiUse QuestionsUpdate
 */
async function updateQuestion(req, res, next) {
  try {
    const {id} = req.params;

    const updated = await questionsService.updateQuestion(id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

/**
 * @api {get} /questions/:id/can-edit Check if user can update the question
 * @apiName CheckUpdatePossibility
 * @apiDescription This route allows to check if user can update the question by id.
 * @apiGroup Questions
 *
 * @apiSampleRequest /questions/:id/can-edit
 *
 * @apiSuccess {Boolean} canEdit Permission to edit.
 * @apiSuccessExample
 *    HTTP/1.1 200 OK
 *    true
 *
 * @apiParam {ObjectId} id    Question id.
 * @apiParamExample {string} Request Url Example:
 *     /api/questions/507f1f77bcf86cd799439011/can-edit
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError NotFound [404] Question not found.
 *
 * @apiUse QuestionsBase
 */
async function canUpdateQuestion(req, res, next) {
  try {
    const {id} = req.params;

    const canUpdate = await questionsService.canUpdateQuestion(id);
    res.json(canUpdate);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getList,
  createQuestion,
  updateQuestion,
  canUpdateQuestion,
  getAppQuestionList,
  getAppQuestion
};
