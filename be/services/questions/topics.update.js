'use strict';

const topicsService = require('../topics/topics.service');
/**
 * Function takes an array of topics and updates topics collection in database
 * if topic exist: do nothing
 * else: upsert new topic
 * @param {string[]} topics
 */
module.exports = topics => topicsService.updateTopics(topics);
