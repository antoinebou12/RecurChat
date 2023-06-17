const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  data: { type: String, required: true },
  type: { type: String, default: 'text' }, // 'text', 'image', 'video', etc.
  createdDate: { type: Date, default: Date.now },
  editedAt: { type: Date }
});

let messageModel = mongoose.model('message', MessageSchema);

module.exports = messageModel;
