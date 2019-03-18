const http = require('http');

const async = require('async');
const socketio = require('socket.io');

const Room = require('../database/models/room');
const User = require('../database/models/user');
 
let messages = [];
let sockets = [];
let catalogue = [];

function init(server) {
    // socketio on the http server
    let io = socketio.listen(server);

    io.on('connection', function (socket) {
        messages.forEach(function (data) {
            socket.emit('message', data);
        });
        
        sockets.push(socket);

        socket.on('disconnect', function () {
            sockets.splice(sockets.indexOf(socket), 1);
            updateRoster();
        });

        socket.on('message', function (msg) {
            let text = String(msg || '');

            if (!text)
                return;

            socket.get('name', function (err, name) {
                let data = {
                    name: name,
                    text: text
                };

                if (name.length !== 0) {
                    createUser(name);
                }else{
                    data = {
                        name: findUser(name),
                        text: text
                    }
                }
                

                broadcast('message', data);
                messages.push(data);

            });
        });
        socket.on('identify', function (name) {
            socket.set('name', String(name || 'Anonymous'), function (err) {
                updateRoster();
            });
        });

        socket.on('room', function (title) {
            socket.set('title', String(title || 'Empty Room'), function (err) {
                updateCatalogue();
            });
        });

    });
}

function updateRoster() {
    async.map(
        sockets,
        function (socket, callback) {
            socket.get('name', callback);
        },
        function (err, names) {
            broadcast('roster', names);
        }
    );
}

//TODO add Catalogue container of the rooms
function updateCatalogue() {
    async.map(
        sockets,
        function (socket, callback) {
            socket.get('room', callback);
        },
        function (err, rooms) {
            broadcast('catalogue', names);
        }
    );
}

function broadcast(event, data) {
    sockets.forEach(function (socket) {
        socket.emit(event, data);
    });
}

function createUser(name) {
    User.findOrCreate({
        username: name
    }, function (err, user) {
        if (err) throw err;
        if (user) {
            console.log(user);
        }
    });
}


module.exports = {
    init,
    updateRoster,
    broadcast
}