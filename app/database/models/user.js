let userModel = require('../schemas/User');

let create = function (data, callback){
	let newUser = new userModel(data);
    newUser.save(callback);
};

let findOne = function (data, callback){
	userModel.findOne(data, callback);
}

let findById = function (id, callback){
	userModel.findById(id, callback);
}

module.exports = { 
	create, 
	findOne, 
    findById
};