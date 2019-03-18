let roomModel = require('../schemas/Room');
let User = require('../models/user');

let create = function (data, callback){
	let newRoom = new roomModel(data);
	newRoom.save(callback);
};

let find = function (data, callback){
	roomModel.find(data, callback);
}

let findOne = function (data, callback){
	roomModel.findOne(data, callback);
}

let findById = function (id, callback){
	roomModel.findById(id, callback);
}

var addUser = function(room, userId, callback){

	// Push a new connection object(i.e. {userId + socketId})
	let member = {userId: userId};
	room.members.push(member);
	room.save(callback);
	console.log(room)
}

module.exports = { 
	create, 
	find, 
	findOne, 
	findById,
	addUser
};