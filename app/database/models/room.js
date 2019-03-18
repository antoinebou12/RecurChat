let roomModel = require('../schemas/Room');
let User = require('../models/user');

let create = function (data, callback) {
	let newRoom = new roomModel(data);
	newRoom.save(callback);
};

let find = function (data, callback) {
	roomModel.find(data, callback);
}

let findOne = function (data, callback) {
	roomModel.findOne(data, callback);
}

let findById = function (id, callback) {
	roomModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	roomModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

var addUser = function (room, user, socket, callback) {

	// Push a new connection object(i.e. {userId + socketId})
	var conn = { 'userId': user._id, 'socketId': socket.id};
	room.connections.push(conn);
	room.save(callback);
}

module.exports = {
	create,
	find,
	findOne,
	findById,
	findByIdAndUpdate,
	addUser
};