'use strict';

const {candidatesRepository} = require('../../repositories');
const {validateCreateCandidate} = require('./candidates.validate');

class CandidatesService {
  async getList(email) {
    if (!email) {
      throw Utils.Error.badRequest('Query param `email` is required', 'candidates.bad_request');
    }

    const query = {email: {$regex: new RegExp(`^${email}`, 'i')}};

    const candidates = await candidatesRepository.find(query).limit(5);

    return candidates;
  }

  async upsertCandidate(data) {
    const candidate = await candidatesRepository.findOne(data);
    if (!candidate) {
      const validatedData = await validateCreateCandidate(data);
      return await candidatesRepository.create(validatedData);
    }

    return candidate;
  }
}

module.exports = new CandidatesService();
