'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const QuestionsSchema = new Schema(
  {
    title: {type: String, minlength: 10, maxlength: 250, required: true},
    description: {type: String, minlength: 10, maxlength: 800, required: true},
    type: {type: String, enum: ['text', 'code'], required: true},
    maxLength: {type: Number, min: 15, max: 480, required: true},
    topics: {
      type: [{type: String, minlength: 2, maxlength: 10}],
      validate: {
        validator: arr => arr.length >= 1 && arr.length <= 5,
        message: props => {
          return props.value.length ? 'Maximum number of topics is 5' : 'Must be at least 1 topic';
        }
      }
    },
    isActive: {type: Boolean, default: true}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('questions', QuestionsSchema);
