'use strict';

const applicationService = require('../services/applications/applications.service');
const answersService = require('../services/answers/answers.service');
const candidatesService = require('../services/candidates/candidates.service');
const emailNotificationService = require('../services/notifications/email-notifications.service');

/**
 * @apiDefine ApplicationsBase
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
 * @apiDefine ApplicationsExternal
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
 * @api {get} /assigned?status=completed Get applications by status
 * @apiQuery {string} completed
 * @apiName ListApplicationsByStatus
 * @apiDescription This route allows to get applications by status.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications/assigned?status=completed
 *
 * @apiSuccess {Array} apllications Applications array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "61ae873f7b3f752e5d39c1d1",
 *       "vacancy": {
 *          "_id": "61a659b90dc105d6e79a1f34",
 *           "title": "third test vacancy",
 *          "type": "Web"
 *       },
 *       "createdBy": "61aa11644afa183fa28b0792",
 *       "executor": {
 *           "_id": "61ae873d7b3f752e5d39c1cc",
 *           "firstName": "firstName",
 *          "lastName": "lastName"
 *       },
 *       "reviewer": "61aa11644afa183fa28b0792",
 *       "status": "Completed",
 *       "createdAt": "2021-12-03T13:52:58.772Z",
 *       "updatedAt": "2021-12-03T13:52:58.772Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse ApplicationsBase
 */
async function getApplicationsByStatus(req, res, next) {
  try {
    const {userUid: reviewerGoogleId} = req;
    const {status} = req.query;
    const applications = await applicationService.getApplicationsByStatus(reviewerGoogleId, status);
    res.json(applications);
  } catch (e) {
    next(e);
  }
}

/**
 * @api {get} /?vacancy=<vacancyId> Get applications by vacancy
 * @apiQuery {ObjectId} vacancyId
 * @apiName ListApplicationsByVacancy
 * @apiDescription This route allows to get applications by vacancy.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications/?vacancy=<vacancyId>
 *
 * @apiSuccess {Array} apllications Applications array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "61ae873f7b3f752e5d39c1d1",
 *       "vacancy": {
 *          "_id": "61a659b90dc105d6e79a1f34",
 *           "title": "third test vacancy",
 *          "type": "Web"
 *       },
 *       "createdBy": "61aa11644afa183fa28b0792",
 *       "executor": {
 *           "_id": "61ae873d7b3f752e5d39c1cc",
 *           "firstName": "firstName",
 *          "lastName": "lastName"
 *       },
 *       "reviewer": "61aa11644afa183fa28b0792",
 *       "status": "Completed",
 *       "createdAt": "2021-12-03T13:52:58.772Z",
 *       "updatedAt": "2021-12-03T13:52:58.772Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse ApplicationsBase
 */
async function getApplicationsByVacancy(req, res, next) {
  try {
    const {vacancy} = req.query;
    const applications = await applicationService.getApplicationsByVacancy(vacancy);

    res.json(applications);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine ApplicationsGet
 *
 * @apiSuccess {ObjectId}                                                 _id          Application id.
 * @apiSuccess {ObjectId}                                                 vacancy      Application vacancy.
 * @apiSuccess {ObjectId}                                                 createdBy    Application createdBy.
 * @apiSuccess {ObjectId}                                                 executor     Application executor.
 * @apiSuccess {ObjectId}                                                 reviewer     Application reviewer.
 * @apiSuccess {String="Invited","In progress","Completed","Evaluated"}   status       Application status.
 * @apiSuccess {Number}                                                   score        Application score.
 * @apiSuccess {Number}                                                   rank         Application rank.
 * @apiSuccess {String}                                                   createdAt    Application creation date.
 * @apiSuccess {String}                                                   updatedAt    Application last update date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *       "_id": "61ae873f7b3f752e5d39c1d1",
 *       "vacancy": {
 *          "_id": "61a659b90dc105d6e79a1f34",
 *           "title": "third test vacancy",
 *          "type": "Web"
 *       },
 *       "createdBy": "61aa11644afa183fa28b0792",
 *       "executor": {
 *           "_id": "61ae873d7b3f752e5d39c1cc",
 *           "firstName": "firstName",
 *          "lastName": "lastName"
 *       },
 *       "reviewer": "61aa11644afa183fa28b0792",
 *       "status": "Evaluated",
 *       "createdAt": "2021-12-03T13:52:58.772Z",
 *       "updatedAt": "2021-12-03T13:52:58.772Z",
 *       "score": 90,
 *       "rank": 1
 *      }
 *
 */
/**
 * @api {get} /:id Get application
 * @apiName GetApplication
 * @apiDescription This route allows to get application by id.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications/61ae873f7b3f752e5d39c1d1
 *
 * @apiParam {ObjectId} id    Application id.
 * @apiParamExample {string} Request Url Example:
 *     /api/applications/61ae873f7b3f752e5d39c1d1
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError ApplicationsNotFound [404] Application not found.
 *
 * @apiUse ApplicationsBase
 * @apiUse ApplicationsGet
 */
async function getApplication(req, res, next) {
  try {
    const id = Utils.checkId(req.params.id);
    const application = await applicationService.getApplication(id);

    res.json(application);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine ApplicationsUpdateReviewer
 *
 * @apiBody {Array}                                [applications]       Applications id.
 * @apiBody {String}                               [reviewer]           Applications reviewer.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 */
/**
 * @api {patch} /applications Update applications reviewer
 * @apiName UpdateApplicationsReviewer
 * @apiDescription This route allows to update applications reviewer by id from json.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications
 *
 * @apiParamExample {string} Request Url Example:
 *     /api/applications
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError ApplicationsNotFound [404] Application not found.
 *
 * @apiUse ApplicationsBase
 * @apiUse ApplicationsUpdateReviewer
 */
async function updateApplicationReviewer(req, res, next) {
  try {
    const {applications, reviewer} = req.body;
    const promises = [];
    for (const application of applications) {
      promises.push(applicationService.updateApplicationReviewer(application, reviewer));
    }
    await Promise.all(promises);

    res.status(204).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @apiDefine ApplicationsUpdate
 *
 * @apiBody {Number}  score    Applications score.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 */
/**
 * @api {patch} /applications/:id Update applications
 * @apiName UpdateApplications
 * @apiDescription This route allows to update application status, score and rank.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications/61b728ffd6402e153a8ad337
 *
 * @apiParamExample {string} Request Url Example:
 *     /api/applications/61b728ffd6402e153a8ad337
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError ApplicationsNotFound [404] Application not found.
 *
 * @apiUse ApplicationsBase
 * @apiUse ApplicationsUpdate
 */
async function updateApplication(req, res, next) {
  try {
    const application = req.params.id;

    const {score} = req.body;

    const {_id, vacancy, createdBy} = await applicationService.updateApplication(
      application,
      score
    );

    const link = `${Utils.constants.APPLICATION_FRONTEND_LINK}/${vacancy}/${_id}`;

    // const mailBoby = await emailNotificationService.createMailFromTemplate(
    //   {firstName: createdBy.firstName, lastName: createdBy.lastName, link},
    //   Utils.Enums.mailTypes.EVALUATED
    // );
    //
    // const mail = {
    //   subject: 'New evaluated application',
    //   body: mailBoby
    // };
    //
    // await emailNotificationService.sendEmail(createdBy.email, mail);

    const type = Utils.Enums.mailTypes.EVALUATED;
    const userData = {
      firstName: createdBy.firstName,
      lastName: createdBy.lastName,
      email: createdBy.email,
      link,
      type,
      subject: 'New evaluated application'
    };
    await emailNotificationService.sendEmail(userData);

    res.status(204).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @apiDefine ApplicationsDelete
 *
 * @apiBody {Array}                                [applications]       Applications id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 */
/**
 * @api {delete} /applications Delete applications
 * @apiName DeleteApplications
 * @apiDescription This route allows to delete applications by id from json.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications
 *
 * @apiParamExample {string} Request Url Example:
 *     /api/applications
 *
 * @apiError InvalidParams [400] ObjectId is invalid.
 * @apiError ApplicationsNotFound [404] Application not found.
 *
 * @apiUse ApplicationsBase
 * @apiUse ApplicationsDelete
 */
async function deleteApplication(req, res, next) {
  try {
    const {applications} = req.body;
    console.log(applications);
    const promises = [];
    for (const application of applications) {
      promises.push(
        answersService.deleteAnswers(application),
        applicationService.deleteApplication(application)
      );
    }
    await Promise.all(promises);

    res.status(204).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @apiDefine ApplicationCreate
 *
 * @apiBody {string}                                                   firstName    Application firstName.
 * @apiBody {string}                                                   lastName     Application lastName.
 * @apiBody {string}                                                   email        Application email.
 * @apiBody {string}                                                   vacancy      Application vacancy.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 */
/**
 * @api {post} /applications/ Create a new application
 * @apiName CreateApplication
 * @apiDescription This route allows user create an new application.
 * @apiGroup Applications
 *
 * @apiSampleRequest /application
 *
 * @apiUse ApplicationsBase
 * @apiUse ApplicationCreate
 */
async function createApplication(req, res, next) {
  try {
    const {userUid: reviewerGoogleId} = req;
    const {firstName, lastName, email, vacancy} = req.body;
    const candidateInfo = {firstName, lastName, email};
    const {id: candidate} = await candidatesService.upsertCandidate(candidateInfo);
    const {_id: application} = await applicationService.createApplication(
      candidate,
      vacancy,
      reviewerGoogleId
    );
    const token = await applicationService.generateJWTApplication(application);
    const link = `${Utils.constants.APPLICATION_CANDIDATE_LINK}/${token}`;
    // const emailTemplate = await emailNotificationService.createMailFromTemplate(
    //   {...candidateInfo, link},
    //   Utils.Enums.mailTypes.INVITE
    // );
    // await emailNotificationService.sendEmail(email, {
    //   body: emailTemplate,
    //   subject: 'You have invitation to pass test'
    // });
    const type = Utils.Enums.mailTypes.INVITE;
    const userData = {
      ...candidateInfo,
      link,
      type,
      subject: 'You have invitation to pass test'
    };
    await emailNotificationService.sendEmail(userData);
    res.status(201).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
}

/**
 * @api {get} /applications/external Get vacacy title and description
 * @apiName GetVacancyTitleAndDescription
 * @apiDescription This route allows to get vacacy title and description.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications/external
 *
 * @apiSuccess {String}    title          Vacancy title.
 * @apiSuccess {String}    type           Vacancy type.
 * @apiSuccess {String}    description    Vacancy description.
 * @apiSuccess {String}    status         Application status.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "vacancy": {
 *           "title": "test vacancy",
 *           "type": "Web"
 *           "description": "test description"
 *        }
 *        "status": "Completed"
 *      }
 *     ]
 *
 * @apiError ApplicationNotFound [404] Application not found.
 *
 * @apiUse ApplicationsExternal
 */
async function getApplicationTitle(req, res, next) {
  try {
    const applicationTitle = await applicationService.getApplicationTitle(req.applicationId);

    res.json(applicationTitle);
  } catch (e) {
    next(e);
  }
}

/**
 * @apiDefine ApplicationUpdateExternal
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse ApplicationsExternal
 */
/**
 * @api {patch} /applications/external/submit Update application status
 * @apiName UpdateApplicationStatus
 * @apiDescription This route allows to update application status.
 * @apiGroup Applications
 *
 * @apiSampleRequest /applications/external/submit
 *
 * @apiParamExample {string} Request Url Example:
 *     /api/applications
 *
 * @apiError ForbiddenActionApplication [403] Forbidden update application.
 * @apiError ApplicationNotFound [404] Application not found.
 *
 * @apiUse ApplicationsExternal
 * @apiUse ApplicationUpdateExternal
 */
async function changeApplicationStatus(req, res, next) {
  try {
    const applicationId = Utils.checkId(req.applicationId);

    const {_id, vacancy, reviewer} = await applicationService.changeApplicationStatus(
      applicationId
    );

    const link = `${Utils.constants.APPLICATION_FRONTEND_LINK}/${vacancy}/${_id}`;

    // const mailBoby = await emailNotificationService.createMailFromTemplate(
    //   {firstName: reviewer.firstName, lastName: reviewer.lastName, link},
    //   Utils.Enums.mailTypes.REVIEW
    // );
    //
    // const mail = {
    //   subject: 'New application to review',
    //   body: mailBoby
    // };
    //
    // await emailNotificationService.sendEmail(reviewer.email, mail);

    const type = Utils.Enums.mailTypes.REVIEW;
    const userData = {
      firstName: reviewer.firstName,
      lastName: reviewer.lastName,
      email: reviewer.email,
      link,
      type,
      subject: 'New application to review'
    };
    await emailNotificationService.sendEmail(userData);

    res.status(204).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = {
  getApplicationsByStatus,
  getApplicationsByVacancy,
  getApplication,
  updateApplicationReviewer,
  updateApplication,
  deleteApplication,
  createApplication,
  getApplicationTitle,
  changeApplicationStatus
};
