let userModel = require('../schemas/User');

let create = function (data, callback) {
	let newUser = new userModel(data);
	newUser.save(callback);
};

let findOne = function (data, callback) {
	userModel.findOne(data, callback);
};

let findById = function (id, callback) {
	userModel.findById(id, callback);
};

let findOrCreate = function (data, callback) {
	findOne({
		'username': data.username
	}, function (err, user) {
		if (err) {
			return callback(err);
		}
		if (user) {
			return callback(err, user);
		} else {
			var userData = {
				username: data.username,
			};
			create(userData, function (err, newUser) {
				callback(err, newUser);
			});
		}
	});
};

module.exports = {
	create,
	findOne,
	findById,
	findOrCreate
};