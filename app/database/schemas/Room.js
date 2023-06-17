const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let RoomSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  members: { type: [{ userId: String, socketId: String }], default: [] },
  owner: { type: String, required: true },
  messages: { type: [String], default: [] }, // assuming messages are stored in a separate collection and their IDs are stored here.
  active: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now },
});

let roomModel = mongoose.model('room', RoomSchema);

module.exports = roomModel;
