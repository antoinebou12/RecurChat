const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true},
  createdDate: { type: Date, default: Date.now },
  permission: {type: Number, default: 1},

});

let userModel = mongoose.model('user', UserSchema);

module.exports = userModel;