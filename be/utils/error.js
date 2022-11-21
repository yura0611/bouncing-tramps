'use strict';

function badRequest(error, status) {
  return {
    error,
    status,
    http_code: 400
  };
}

function notAuthorized(error, status) {
  return {
    error,
    status,
    http_code: 401
  };
}

function forbidden(error, status) {
  return {
    error,
    status,
    http_code: 403
  };
}

function notFound(error, status) {
  return {
    error,
    status,
    http_code: 404
  };
}

module.exports = {badRequest, notAuthorized, forbidden, notFound};
