const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let message = new Schema({
  room: {type: String},
  username:{type: String},
  data: {type: String},
  createdDate: { type: Date, default: Date.now },

});


module.exports = message