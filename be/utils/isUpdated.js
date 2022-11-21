'use strict';

const {notFound} = require('./error');

module.exports = (response, modelName) => {
  if (!response.value) {
    throw notFound(`${modelName} not found`, `${modelName.toLowerCase()}.not_found`);
  }

  return response.value;
};
