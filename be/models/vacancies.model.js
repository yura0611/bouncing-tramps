'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const VacanciesSchema = new Schema(
  {
    title: {type: String, minlength: 10, maxlength: 200, required: true},
    type: {
      type: String,
      enum: ['Web', 'Management', 'IOS', 'Android'],
      required: true
    },
    createdBy: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    description: {type: String, minlength: 10, maxlength: 800, required: true},
    isActive: {type: Boolean, default: true},
    link: {type: String},
    questions: {
      type: [{type: Schema.Types.ObjectId, ref: 'questions'}],
      validate: {
        validator: arr => arr.length > 0 && arr.length <= 20,
        message: props => {
          return props.value.length
            ? 'There are more than 20 questions'
            : "Question list can't be empty";
        }
      }
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('vacancies', VacanciesSchema);
