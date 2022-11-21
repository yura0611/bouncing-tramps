'use strict';

const Error = require('./error');

async function _docExists(id, repo, collection) {
  const docExists = await repo.exists({_id: id});
  if (!docExists) {
    throw Error.badRequest(`There is no document for id ${id}`, `${collection}.validation_failed`);
  }
}

/**
 * Function that checks if all ref fields in object exist in DB
 * @param {Object} object
 * @param {Object<String, Object<Repository>>} fieldsAndReposObj
 * @returns {Promise<void>}
 *
 * @example
 * await checkRefs({
 *   name: 'Yurii',
 *   mother: '6197dc0a640594148329d6d2',
 *   father: '6297dk0a640594148329d6d2',
 *   brothers: ['6197dc0a640594145529d6d2', '6197dc22640594148329d6d2']
 * }, {
 *   'mother': mothersRepository,
 *   'father': fathersRepository,
 *   'brothers': brothersRepository
 * })
 */
async function checkRefs(object, fieldsAndReposObj) {
  for (const field in fieldsAndReposObj) {
    const repo = fieldsAndReposObj[field];
    let value = object[field];

    if (!Array.isArray(value)) {
      value = [value];
    }

    for (const id of value) {
      await _docExists(id, repo, field);
    }
  }
}

module.exports = checkRefs;
