'use strict';

module.exports = (req, res, next, id) => {
  Utils.checkId(id);

  next();
};
