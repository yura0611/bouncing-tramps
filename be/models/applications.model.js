'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const {Enums} = require('../utils');

const ApplicationsSchema = new Schema(
  {
    vacancy: {type: Schema.Types.ObjectId, ref: 'vacancies', required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    executor: {type: Schema.Types.ObjectId, ref: 'candidates', required: true},
    reviewer: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    status: {
      type: String,
      enum: Object.values(Enums.applicationsStatuses),
      required: true
    },
    score: {type: Number, min: 0, max: 100},
    rank: {type: Number, min: 1}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

ApplicationsSchema.methods.getVacancyForExternal = function getVacancyForExternal() {
  return {
    vacancy: this.vacancy,
    status: this.status
  };
};

module.exports = mongoose.model('applications', ApplicationsSchema);
