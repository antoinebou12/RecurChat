const mongoose = require('mongoose');

const Room = require('./models/room');
const User = require('./models/user');

const config = require('../config/config.json');

const host = config.db.host
const port = config.db.port
const database = config.db.name

mongoose.set('useCreateIndex', true)

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Database connection successful')
  })

// Throw an error if the connection fails
mongoose.connection.on('error', function (err) {
  if (err) throw err;
});



// let roomId = null

// let room1 = Room.create({ title: "Room1"},  function(err, room){
//   if(err) throw err;
//   if(room){
//     roomId = room._id
// console.log(roomId)
//   }
// });


// let user1 = User.create({ username: "Antoine1"},  function(err, user){
//   if(err) throw err;
//   if(user){
//     console.log(user._id)
//   }
// });


// let user2Id = null

// let user2 = User.create({ username: "Antoine2"},  function(err, user){
//   if(err) throw err;
//   if(user){
//     user2Id = user._id
// console.log(user2Id)
//   }
// });

// Room.findOne(roomId, function(err, room){
//   if(err) throw err;
//   if(room){
//     console.log(room)
//     Room.addUser(room, user2Id, function(err, newRoom){
//       if(err) throw err;
//       if(newRoom){
//         console.log(newRoom._id)
//       }
//     });
//   }
// });