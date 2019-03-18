const express = require('express');
let router = express.Router();

var User = require('../database/models/user');
var Room = require('../database/models/room');

// Home page
router.get('/', function(req, res, next) {
    res.render("index")
});

// Rooms
router.get('/catalogue', function(req, res, next) {
	Room.find(function(err, rooms){
		if(err) throw err;
		res.render('rooms', { rooms });
	});
});

// Chat Room 
router.get('/room/:id', function(req, res, next) {
	var roomId = req.params.id;
	Room.findById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
		}
		res.render('room', { user: req.user, room: room });
	});
	
});

module.exports = router;