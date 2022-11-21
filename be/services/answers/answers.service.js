'use strict';

const {answersRepository, applicationsRepository, usersRepository} = require('../../repositories');

const {validateMarkAnswer, validateCreateAnswer} = require('./answers.validate');

class AnswersService {
  async getList(filterBy) {
    const answers = await answersRepository
      .find({application: {$eq: filterBy}})
      .populate('question');

    return answers;
  }

  async findAnswerById(id) {
    const answer = await answersRepository.findById(id).populate('question');

    if (!answer) {
      throw Utils.Error.notFound('Answer not found', 'answers.not_found');
    }

    return answer;
  }

  async markAnswer(id, userUid, payload) {
    const {reviewerRank} = await validateMarkAnswer(payload);

    const answer = await answersRepository.findById(id);

    if (!answer) {
      throw Utils.Error.notFound('Answer not found', 'answers.not_found');
    }

    const application = await applicationsRepository.findById(answer.application);

    if (!application) {
      throw Utils.Error.notFound('Applications not found', 'applications.not_found');
    }

    if (application.status !== Utils.Enums.applicationsStatuses.COMPLETED) {
      throw Utils.Error.forbidden('Forbidden update answer', 'answers.forbidden');
    }

    const reviewer = application.reviewer.toString();

    const userMakedMark = await usersRepository.findOne({uid: userUid});

    if (reviewer !== userMakedMark._id.toString()) {
      throw Utils.Error.forbidden('Forbidden update answer', 'answers.forbidden');
    }

    const evaluatedAnswer = await answersRepository.findByIdAndUpdate(
      {_id: id},
      {$set: {reviewerRank, reviewer, status: Utils.Enums.answersStatuses.EVALUATED}},
      {new: true}
    );

    return evaluatedAnswer;
  }

  async createAnswer(payload, applicationId) {
    const data = await validateCreateAnswer(payload);

    const application = await applicationsRepository.findById(applicationId).populate('vacancy');

    if (!application) {
      throw Utils.Error.notFound('Application not found', 'applications.not_found');
    }

    if (
      application.status === Utils.Enums.applicationsStatuses.COMPLETED ||
      application.status === Utils.Enums.applicationsStatuses.EVALUATED
    ) {
      throw Utils.Error.forbidden('Forbidden create answer', 'answers.forbidden');
    }

    const isQuestionInVacancy = application.vacancy.questions.find(
      questionId => questionId.toString() === data.question
    );

    if (!isQuestionInVacancy) {
      throw Utils.Error.badRequest('Invalid question id', 'answer.bad_request');
    }

    const isAnswerCreated = await answersRepository.findOne({
      $and: [{application: {$eq: applicationId}}, {question: {$eq: data.question}}]
    });

    if (isAnswerCreated) {
      throw Utils.Error.forbidden('Forbidden create answer', 'answers.forbidden');
    }

    data.candidate = application.executor.toString();

    data.reviewer = application.reviewer.toString();

    data.application = applicationId;

    const answer = await answersRepository.create(data);

    if (application.status === Utils.Enums.applicationsStatuses.INVITED) {
      await applicationsRepository.findByIdAndUpdate(applicationId, {
        status: Utils.Enums.applicationsStatuses.IN_PROGRESS
      });
    }

    return answer.getForCandidate();
  }

  async deleteAnswers(applicationId) {
    return await answersRepository.deleteMany({application: applicationId});
  }
}

module.exports = new AnswersService();
