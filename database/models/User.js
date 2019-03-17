const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  createdDate: { type: Date, default: Date.now },
  permission: {type: Number, default: 1},

});

UserSchema.plugin(uniqueValidator);


module.exports = UserSchema