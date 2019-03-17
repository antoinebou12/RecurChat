const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let RoomSchema = new Schema({
  roomname: { type: String, required: true, unique: true },
  createdDate: { type: Date, default: Date.now },
  members:{ type: Array},
});

RoomSchema.plugin(uniqueValidator);

module.exports = room