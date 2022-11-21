'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const CandidatesSchema = new Schema(
  {
    firstName: {type: String, minlength: 2, required: true},
    lastName: {type: String, minlength: 2, required: true},
    email: {type: String, required: true, unique: true}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('candidates', CandidatesSchema);
