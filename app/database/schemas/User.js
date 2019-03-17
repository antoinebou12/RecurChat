const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  createdDate: { type: Date, default: Date.now },
  permission: {type: Number, default: 1},

});

UserSchema.plugin(uniqueValidator);

let userModel = mongoose.model('user', UserSchema);

module.exports = userModel