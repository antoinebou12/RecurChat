let messageModel = require('../schemas/Message');

let create = function (data, callback) {
    let newMessage = new userModel(data);
    newMessage.save(callback);
};

let findOne = function (data, callback) {
    messageModel.findOne(data, callback);
};

let findById = function (id, callback) {
    messageModel.findById(id, callback);
};

module.exports = {
    create,
    findOne,
    findById,
};