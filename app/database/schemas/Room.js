const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let RoomSchema = new Schema({
  title: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  members:{ type: Array},
});

let roomModel = mongoose.model('room', RoomSchema);

module.exports = roomModel