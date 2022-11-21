'use strict';

const {vacanciesRepository, questionsRepository, usersRepository} = require('../../repositories');

const {
  validateCreateVacancy,
  validateUpdateVacancy,
  checkTotalLength
} = require('./vacancies.validate');

class VacanciesService {
  async getList() {
    return vacanciesRepository.find({}).sort({createdAt: -1});
  }

  async getVacancy(id) {
    const existingVacancy = await vacanciesRepository.findById(id);

    if (!existingVacancy) {
      throw Utils.Error.notFound('Vacancy not found', 'vacancy.not_found');
    }

    return existingVacancy;
  }

  async createVacancy(payload, createdByUid) {
    const data = await validateCreateVacancy(payload);

    await Utils.checkRefs(data, {
      questions: questionsRepository
    });

    await checkTotalLength(data.questions);

    const {_id: createdBy} = await usersRepository.findOne({uid: createdByUid});

    return vacanciesRepository.create({...data, createdBy});
  }

  async updateVacancy(id, dataToUpdate) {
    const data = await validateUpdateVacancy(dataToUpdate);

    const res = await vacanciesRepository.findByIdAndUpdate(id, data, {new: true, rawResult: true});

    return Utils.isUpdated(res, 'Vacancy');
  }
}

module.exports = new VacanciesService();
