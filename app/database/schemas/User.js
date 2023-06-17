const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: null },
  bio: { type: String, default: '' },
  createdDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  permission: { type: Number, default: 1 },
});

let userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
