'use strict';

const {
  questionsRepository,
  vacanciesRepository,
  answersRepository,
  applicationsRepository
} = require('../../repositories');
const {validateCreateQuestion, validateUpdateQuestion} = require('./questions.validate');
const updateTopics = require('./topics.update');

class QuestionsService {
  async getList(vacancy) {
    if (vacancy) {
      return this._getVacancyQuestions(Utils.checkId(vacancy));
    }

    return questionsRepository.find({isActive: true});
  }

  async _getVacancyQuestions(vacancyId, projection) {
    const vacancy = await vacanciesRepository.findById(vacancyId);

    if (!vacancy) {
      throw Utils.Error.notFound('Vacancy not found', 'vacancy.not_found');
    }

    return questionsRepository.find({_id: {$in: vacancy.questions}}, projection);
  }

  async createQuestion(payload) {
    const data = await validateCreateQuestion(payload);
    await updateTopics(data.topics);

    return questionsRepository.create(data);
  }

  async updateQuestion(id, dataToUpdate) {
    const data = await validateUpdateQuestion(dataToUpdate);

    if (data.topics) {
      await updateTopics(data.topics);
    }

    const res = await questionsRepository.findByIdAndUpdate(id, data, {new: true, rawResult: true});

    return Utils.isUpdated(res, 'Question');
  }

  async canUpdateQuestion(id) {
    const questionExists = await questionsRepository.exists({_id: id});
    if (!questionExists) {
      throw Utils.Error.notFound('Question not found', 'question.not_found');
    }

    const answerExists = await answersRepository.exists({question: id});
    if (answerExists) {
      return false;
    }

    const vacancyExists = await vacanciesRepository.exists({questions: id});
    return !vacancyExists;
  }

  async getAppQuestionList(applicationId) {
    const {vacancy} = await applicationsRepository.findById(applicationId, 'vacancy');

    const allQuestions = await this._getVacancyQuestions(vacancy, 'title type maxLength');

    const answers = await answersRepository.find({application: applicationId});

    const answersCount = answers.length;

    return allQuestions.map((question, i) => {
      if (i >= answersCount) {
        question.title = null;
      }
      return question;
    });
  }

  getAppQuestion(id) {
    return questionsRepository.findById(id);
  }
}

module.exports = new QuestionsService();
