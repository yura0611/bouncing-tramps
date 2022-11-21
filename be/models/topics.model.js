'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const TopicsSchema = new Schema(
  {
    name: {type: String, minlength: 2, maxlength: 10, unique: true}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('topics', TopicsSchema);
