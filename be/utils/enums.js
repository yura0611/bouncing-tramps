'use strict';

const tokenTypes = Object.freeze({
  BEARER: 'bearer'
});

const applicationsStatuses = Object.freeze({
  INVITED: 'Invited',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  EVALUATED: 'Evaluated'
});

const answersStatuses = Object.freeze({
  ANSWERED: 'Answered',
  EVALUATED: 'Evaluated'
});

const mailTypes = Object.freeze({
  INVITE: 'invite',
  REVIEW: 'review',
  EVALUATED: 'evaluated'
});

module.exports = {tokenTypes, applicationsStatuses, answersStatuses, mailTypes};
