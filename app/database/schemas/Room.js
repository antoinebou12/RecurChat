const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let RoomSchema = new Schema({
  title: { type: String, required: true },
  members: { type: [{ userId: String }]},
  createdDate: { type: Date, default: Date.now },
  
});

let roomModel = mongoose.model('room', RoomSchema);

module.exports = roomModel