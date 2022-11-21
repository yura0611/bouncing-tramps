'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const {Enums} = require('../utils');

const AnswersSchema = new Schema(
  {
    application: {type: Schema.Types.ObjectId, ref: 'applications', required: true},
    question: {type: Schema.Types.ObjectId, ref: 'questions', required: true},
    candidate: {type: Schema.Types.ObjectId, ref: 'candidates', required: true},
    reviewer: {type: Schema.Types.ObjectId, ref: 'users'},
    reviewerRank: {type: Number, min: 0, max: 10},
    candidateAnswer: {type: String, maxlength: 1000, required: true},
    completionTime: {type: Number, min: 0, required: true},
    status: {
      type: String,
      enum: Object.values(Enums.answersStatuses),
      default: Enums.answersStatuses.ANSWERED
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

AnswersSchema.methods.getForCandidate = function getForCandidate() {
  return {
    _id: this._id,
    application: this.application,
    question: this.question,
    candidate: this.candidate,
    candidateAnswer: this.candidateAnswer,
    completionTime: this.completionTime,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model('answers', AnswersSchema);
