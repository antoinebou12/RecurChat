const http = require('http');

const async = require('async');
const socketio = require('socket.io');

const Room = require('../database/models/room');
const User = require('../database/models/user');
const Message = require('../database/models/message');

let messages = [];
let sockets = [];
let catalogue = [];

function init(server) {

    // socketio on the http server
    let io = socketio.listen(server);

    io.on('connection', function (socket) {

        console.log('a socket connected');

        //push the current socket in the list of sockets
        sockets.push(socket);

        socket.on('disconnect', function(){
            console.log('socket disconnected');
          });

    });
}

function broadcast(event, data) {
    sockets.forEach(function (socket) {
        socket.emit(event, data);
    });
}


function createUser(name) {
    User.findOrCreate({
        'username': name
    }, function (err, user) {
        if (err) throw err;
        if (user) {
            console.log(user);
        }
    });
}

function createMessage(data) {
    User.creater({
        'data': data
    }, function (err, message) {
        if (err) throw err;
        if (user) {
            console.log(message);
        }
    });
}


module.exports = {
    init,
    broadcast
};