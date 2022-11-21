'use strict';

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Perform distinct operation
   * @param {String} field
   * @param {Object|Query} [filter]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.distinct}
   * @returns {*}
   */
  distinct(field, filter) {
    return this.model.distinct(field, filter);
  }

  /**
   * Perform aggregate operation
   * @param {Array} pipeline
   * @param {Object} options
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.aggregate}
   * @returns {*}
   */
  aggregate(pipeline, options) {
    return this.model.aggregate(pipeline, options);
  }

  /**
   * Create one or multiple docs
   * @param {Array|Object} docs
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.create}
   * @returns {*}
   */
  create(docs, options) {
    return this.model.create(docs, options);
  }

  /**
   * Creates multiple docs
   * @param {Array|Object|*} doc(s)
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.insertMany}
   * @returns {*}
   */
  insertMany(docs, options) {
    return this.model.insertMany(docs, options);
  }

  /**
   * Finds all of the documents that match conditions
   * @param {Object} filter
   * @param {Object|String|Array<String>} [projection]
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.find}
   * @returns {*}
   */
  find(filter, projection, options) {
    return this.model.find(filter, projection, options);
  }

  /**
   * Finds the first document that matches conditions
   * @param {Object} conditions
   * @param {Object|String|Array<String>} projection
   * @param {Object} options
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findOne}
   * @returns {*}
   */
  findOne(conditions, projection, options) {
    return this.model.findOne(conditions, projection, options);
  }

  /**
   * Finds a single document by its _id field
   * @param {ObjectId} id
   * @param {Object|String|Array<String>} [projection]
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findById}
   * @returns {*}
   */
  findById(id, projection, options) {
    return this.model.findById(id, projection, options);
  }

  /**
   * Updates the first document that matches conditions
   * @param {Object} filter
   * @param {Object|Array} update
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.updateOne}
   * @returns {*}
   */
  updateOne(filter, update, options) {
    return this.model.updateOne(filter, update, options);
  }

  /**
   * Finds the document by id and updates it
   * @param {ObjectId} id
   * @param {Object|Array} update
   * @param {Object} [options]
   * @param {Function} [callback]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate}
   * @returns {*}
   */
  findByIdAndUpdate(id, update, options, callback) {
    return this.model.findByIdAndUpdate(id, update, options, callback);
  }

  /**
   * Updates all of the documents that match conditions
   * @param {Object} filter
   * @param {Object|Array} update
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.updateMany}
   * @returns {*}
   */
  updateMany(filter, update, options) {
    return this.model.updateMany(filter, update, options);
  }

  /**
   * Deletes the first document that matches conditions
   * @param {Object} filter
   * @param {Object} update
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne}
   * @returns {*}
   */
  deleteOne(filter, update) {
    return this.model.deleteOne(filter, update);
  }

  /**
   * Deletes all of the documents that match conditions
   * @param {Object} conditions
   * @param {Object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany}
   * @returns {*}
   */
  deleteMany(conditions, options) {
    return this.model.deleteMany(conditions, options);
  }

  /**
   * Returns true if at least one document exists in the database that matches the given filter, and false otherwise.
   * @param {Object} filter
   * @param {Object} [options]
   * @param {Function} [callback]
   * @returns {*}
   */
  exists(filter, options, callback) {
    return this.model.exists(filter, options, callback);
  }

  /**
   * Perform bulkWrite operation
   * @param {array} ops
   * @param {Object} [options]
   * @param {function} [callback]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.bulkWrite}
   */
  bulkWrite(ops, options, callback) {
    return this.model.bulkWrite(ops, options, callback);
  }
}

module.exports = BaseRepository;
