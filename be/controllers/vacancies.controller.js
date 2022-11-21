'use strict';

const {vacanciesService} = require('../services');

/**
 * @apiDefine VacanciesBase
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
 * @apiDefine VacanciesGet
 *
 * @apiSuccess {ObjectId}                                  _id          Vacancy id.
 * @apiSuccess {String}                                    title        Vacancy title.
 * @apiSuccess {String="Web","Management","IOS","Android"} type         Vacancy type
 * @apiSuccess {String}                                    [link]       Vacancy link.
 * @apiSuccess {String}                                    description  Vacancy description.
 * @apiSuccess {Boolean}                                   isActive     Vacancy status.
 * @apiSuccess {ObjectId[]}                                questions    Vacancy questions
 * @apiSuccess {String}                                    createdAt    Vacancy creation date.
 * @apiSuccess {String}                                    updatedAt    Vacancy last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "_id": "6192fed468bdd05ad4618292",
 *        "title": "Test vacancy title",
 *        "description": "Test vacancy description",
 *        "link": "https://www.example.com",
 *        "createdBy": "6192fed46855555ad4618292",
 *        "createdAt": "2021-11-16T00:44:04.392Z",
 *        "updatedAt": "2021-11-16T00:44:04.392Z",
 *        "questions": ["6192fed468bd666ad4618292", ...],
 *        "isActive": true
 *      }
 *
 */

/**
 * @api {get} /vacancies/:id Get vacancy
 * @apiName GetVacancies
 * @apiDescription This route allows to get vacancy by id.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/:id
 *
 * @apiParam {ObjectId} id    Vacancy id.
 * @apiParamExample {string} Request Url Example:
 *     /api/vacancies/507f1f77bcf86cd799439011
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError VacanciesNotFound [404] Vacancy not found.
 *
 * @apiUse VacanciesBase
 * @apiUse VacanciesGet
 */
async function getVacancy(req, res, next) {
  try {
    const id = req.params.id;

    const vacancy = await vacanciesService.getVacancy(id);
    res.json(vacancy);
  } catch (e) {
    next(e);
  }
}

/**
 * @api {get} /vacancies Get all vacancies
 * @apiName ListVacancies
 * @apiDescription This route allows to list all vacancies.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/
 *
 * @apiSuccess {Array} vacancies Vacancies array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id": "6192fed468bdd05ad4618292",
 *        "title": "Test vacancy title",
 *        "description": "Test vacancy description",
 *        "link": "https://www.example.com",
 *        "createdBy": "6192fed46855555ad4618292",
 *        "createdAt": "2021-11-16T00:44:04.392Z",
 *        "updatedAt": "2021-11-16T00:44:04.392Z",
 *        "questions": ["6192fed468bd666ad4618292", ...],
 *        "isActive": true
 *      },
 *      ...
 *     ]
 *
 * @apiUse VacanciesBase
 */
async function getList(req, res, next) {
  try {
    const vacancies = await vacanciesService.getList();

    res.json(vacancies);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine VacanciesCreate
 *
 * @apiBody {String}                                    title       Vacancy title.
 * @apiBody {String="Web","Management","IOS","Android"} type        Vacancy type
 * @apiBody {String}                                    description Vacancy description.
 * @apiBody {String}                                    [link]      Vacancy link.
 * @apiBody {ObjectId[]}                                questions   Vacancy questions.
 *
 * @apiSuccess {ObjectId}                                  _id          Vacancy id.
 * @apiSuccess {String}                                    title        Vacancy title.
 * @apiSuccess {String="Web","Management","IOS","Android"} type         Vacancy type
 * @apiSuccess {String}                                    [link]       Vacancy link.
 * @apiSuccess {String}                                    description  Vacancy description.
 * @apiSuccess {Boolean}                                   isActive     Vacancy status.
 * @apiSuccess {ObjectId[]}                                questions    Vacancy questions
 * @apiSuccess {String}                                    createdAt    Vacancy creation date.
 * @apiSuccess {String}                                    updatedAt    Vacancy last update date.
 * @apiSuccess {ObjectId}                                  createdBy    Vacancy author
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "_id": "6192fed468bdd05ad4618292",
 *        "title": "Test vacancy title",
 *        "description": "Test vacancy description",
 *        "link": "https://www.example.com",
 *        "createdBy": "6192fed46855555ad4618292",
 *        "createdAt": "2021-11-16T00:44:04.392Z",
 *        "updatedAt": "2021-11-16T00:44:04.392Z",
 *        "questions": ["6192fed468bd666ad4618292", ...],
 *        "isActive": true
 *      }
 *
 */
/**
 * @api {post} /vacancies Create a new vacancy
 * @apiName CreateVacancy
 * @apiDescription This route allows to create a new vacancy.
 * @apiGroup Vacancies
 *
 * @apiUse VacanciesBase
 * @apiUse VacanciesCreate
 */
async function createVacancy(req, res, next) {
  try {
    const vacancy = await vacanciesService.createVacancy(req.body, req.userUid);

    res.json(vacancy);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine VacanciesUpdate
 *
 * @apiBody {String}                                    [title]       Vacancy title.
 * @apiBody {String="Web","Management","IOS","Android"} [type]        Vacancy type
 * @apiBody {String}                                    [description] Vacancy description.
 * @apiBody {String}                                    [link]        Vacancy link.
 * @apiBody {Boolean}                                   [isActive]    Vacancy status
 *
 * @apiSuccess {ObjectId}                                  _id          Vacancy id.
 * @apiSuccess {String}                                    title        Vacancy title.
 * @apiSuccess {String="Web","Management","IOS","Android"} type         Vacancy type
 * @apiSuccess {String}                                    [link]       Vacancy link.
 * @apiSuccess {String}                                    description  Vacancy description.
 * @apiSuccess {Boolean}                                   isActive     Vacancy status.
 * @apiSuccess {ObjectId[]}                                questions    Vacancy questions
 * @apiSuccess {String}                                    createdAt    Vacancy creation date.
 * @apiSuccess {String}                                    updatedAt    Vacancy last update date.
 * @apiSuccess {ObjectId}                                  createdBy    Vacancy author
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "_id": "6192fed468bdd05ad4618292",
 *        "title": "Test vacancy title",
 *        "description": "Test vacancy description",
 *        "link": "https://www.example.com",
 *        "createdBy": "6192fed46855555ad4618292",
 *        "createdAt": "2021-11-16T00:44:04.392Z",
 *        "updatedAt": "2021-11-16T00:44:04.392Z",
 *        "questions": ["6192fed468bd666ad4618292", ...],
 *        "isActive": true
 *      }
 *
 */
/**
 * @api {patch} /vacancies/:id Update vacancy
 * @apiName UpdateVacancies
 * @apiDescription This route allows to update vacancy by id.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/:id
 *
 * @apiParam {ObjectId} id    Vacancy id.
 * @apiParamExample {string} Request Url Example:
 *     /api/vacancies/507f1f77bcf86cd799439011
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError VacanciesNotFound [404] Vacancy not found.
 *
 * @apiUse VacanciesBase
 * @apiUse VacanciesUpdate
 */
async function updateVacancy(req, res, next) {
  try {
    const id = req.params.id;
    const dataToUpdate = req.body;

    const updated = await vacanciesService.updateVacancy(id, dataToUpdate);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getList,
  getVacancy,
  createVacancy,
  updateVacancy
};
