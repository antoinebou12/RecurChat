const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  data: {type: String, required: true},
  createdDate: { type: Date, default: Date.now },

});

let messageModel = mongoose.model('message', MessageSchema);

module.exports = messageModel;