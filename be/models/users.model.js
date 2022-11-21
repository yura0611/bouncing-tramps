'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const UsersSchema = new Schema(
  {
    firstName: {type: String, minlength: 1, required: true},
    lastName: {type: String, minlength: 1, required: true},
    picture: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

UsersSchema.methods.getUser = function getUser() {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    picture: this.picture,
    email: this.email
  };
};

module.exports = mongoose.model('users', UsersSchema);
