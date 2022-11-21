'use strict';

const {topicsRepository} = require('../../repositories');

class TopicsService {
  updateTopics(topics) {
    const bulkOps = topics.map(topic => {
      return {
        updateOne: {
          filter: {name: topic},
          update: {name: topic},
          upsert: true
        }
      };
    });

    return topicsRepository.bulkWrite(bulkOps);
  }

  getList() {
    return topicsRepository.find();
  }
}

module.exports = new TopicsService();
