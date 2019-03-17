const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let message = new Schema({
  data: {type: String},
  createdDate: { type: Date, default: Date.now },

});

let messageModel = mongoose.model('message', MessageSchema);

module.exports = messageModel