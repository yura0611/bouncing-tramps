'use strict';

module.exports = {
  questionsService: require('./questions/questions.service'),
  vacanciesService: require('./vacancies/vacancies.service'),
  topicsService: require('./topics/topics.service'),
  AuthService: require('./auth/auth.service'),
  usersService: require('./users/users.service'),
  candidatesService: require('./candidates/candidates.service'),
  answersService: require('./answers/answers.service'),
  emailNotificationService: require('./notifications/email-notifications.service')
};
