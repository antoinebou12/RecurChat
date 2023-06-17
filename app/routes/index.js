const express = require('express');
const router = express.Router();

const User = require('../database/models/user');
const Room = require('../database/models/room');

// Home page
router.get('/', (req, res) => {
    res.render("index");
});

// Rooms
router.get('/catalogue', async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.render('rooms', { rooms });
	} catch(err) {
		next(err);
	}
});

// Chat Room 
router.get('/room/:id', async (req, res, next) => {
	try {
		const roomId = req.params.id;
		const room = await Room.findById(roomId);

		if(!room){
			const error = new Error('Room not found');
			error.status = 404;
			throw error;
		}

		res.render('room', { user: req.user, room: room });
	} catch(err) {
		next(err);
	}
});
module.exports = router;
