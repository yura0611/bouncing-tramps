'use strict';

const {
  applicationsRepository,
  usersRepository,
  answersRepository,
  vacanciesRepository
} = require('../../repositories');
const {
  validateCreateApplication,
  validateUpdateApplicationReviewer,
  validateUpdateApplication
} = require('./applications.validate');
const jwt = require('jsonwebtoken');
const keys = require('../../config/externalJWTKeys.json');

class ApplicationsService {
  async getApplicationsByStatus(reviewerGoogleId, status) {
    const reviewer = await usersRepository.findOne({uid: reviewerGoogleId});

    return await applicationsRepository
      .find({
        reviewer,
        status: {$regex: status, $options: 'i'}
      })
      .populate('vacancy', {title: 1, type: 1})
      .populate('executor', {firstName: 1, lastName: 1});
  }

  async getApplicationsByVacancy(vacancy) {
    return await applicationsRepository
      .find({vacancy: vacancy})
      .populate('executor', {firstName: 1, lastName: 1})
      .populate('reviewer', {firstName: 1, lastName: 1});
  }

  async getApplication(id) {
    const application = await applicationsRepository
      .findOne({_id: id})
      .populate('executor', {firstName: 1, lastName: 1})
      .populate('vacancy', {title: 1});

    if (!application) {
      throw Utils.Error.notFound('Application not found', 'application.not_found');
    }

    return application;
  }

  async updateApplicationReviewer(id, reviewer) {
    const data = await validateUpdateApplicationReviewer({reviewer});

    if (!id) {
      throw Utils.Error.badRequest('Invalid application id', 'application.bad_request');
    }

    const updated = await applicationsRepository.findByIdAndUpdate(
      {_id: id},
      {$set: data},
      {new: true}
    );

    if (!updated) {
      throw Utils.Error.notFound('Application not found', 'application.not_found');
    }

    return updated;
  }

  async updateApplication(id, score) {
    const dataToUpdate = await validateUpdateApplication({score});
    dataToUpdate.status = Utils.Enums.applicationsStatuses.EVALUATED;

    if (!id) {
      throw Utils.Error.badRequest('Invalid application id', 'application.bad_request');
    }

    const updated = await applicationsRepository
      .findByIdAndUpdate(id, dataToUpdate)
      .populate('createdBy');

    if (!updated) {
      throw Utils.Error.notFound('Application not found', 'application.not_found');
    }

    const updatedApllications = await applicationsRepository
      .find({vacancy: updated.vacancy, score: {$ne: null}})
      .sort({score: -1, createdAt: 1});

    const bulkOptions = updatedApllications.map((application, index) => ({
      updateOne: {
        filter: {_id: application._id},
        update: {rank: ++index}
      }
    }));

    await applicationsRepository.bulkWrite(bulkOptions);
    return updated;
  }

  async deleteApplication(id) {
    if (!id) {
      throw Utils.Error.badRequest('Invalid application id', 'application.bad_request');
    }

    return await applicationsRepository.deleteOne({_id: id});
  }

  async createApplication(candidate, vacancy, reviewerGoogleId) {
    const {_id: userId} = await usersRepository.findOne({uid: reviewerGoogleId});
    const user = userId.toString();
    const status = Utils.Enums.applicationsStatuses.INVITED;
    const data = {vacancy, reviewer: user, createdBy: user, executor: candidate, status};
    const {isActive} = await vacanciesRepository.findOne({vacancy: vacancy});
    const application = await applicationsRepository.findOne({
      executor: candidate,
      vacancy: vacancy
    });

    if (application || !isActive) {
      throw Utils.Error.forbidden('Forbidden create application', 'applications.forbidden');
    }

    const dataToCreate = await validateCreateApplication(data);
    return applicationsRepository.create(dataToCreate);
  }

  async generateJWTApplication(application) {
    return jwt.sign({applicationId: application}, keys.jwt.secret, {expiresIn: '72h'});
  }

  async getApplicationTitle(id) {
    const application = await applicationsRepository
      .findOne({_id: id})
      .populate('vacancy', {_id: 0, title: 1, type: 1, description: 1});

    if (!application) {
      throw Utils.Error.notFound('Application not found', 'application.not_found');
    }

    return application.getVacancyForExternal();
  }

  async changeApplicationStatus(id) {
    const application = await applicationsRepository.findById({_id: id});

    if (!application) {
      throw Utils.Error.notFound('Application not found', 'application.not_found');
    }

    if (
      application.status === Utils.Enums.applicationsStatuses.COMPLETED ||
      application.status === Utils.Enums.applicationsStatuses.EVALUATED
    ) {
      throw Utils.Error.forbidden('Forbidden update application', 'applications.forbidden');
    }

    const answers = await answersRepository.find({application: id});
    const vacancies = await vacanciesRepository.findById({_id: application.vacancy});

    if (answers.length !== vacancies.questions.length) {
      throw Utils.Error.forbidden('Forbidden update application', 'applications.forbidden');
    }

    return await applicationsRepository
      .findByIdAndUpdate(
        {_id: id},
        {status: Utils.Enums.applicationsStatuses.COMPLETED},
        {new: true}
      )
      .populate('reviewer');
  }
}

module.exports = new ApplicationsService();
