const async = require('async');
const io = require('socket.io')();

// Chatroom

let sockets = [];
let users_all = [];
let users_online = [];
let messages = [];
let catalogue = [];

io.on('connection', (socket) => {
console.log("connection")
sockets.push(socket)
console.log("sockets connected: " + sockets.length)

// when the client emits 'new message', this listens and executes
socket.on('new message', (message) => {
    console.log("new message: " + message)

    let text = String(message || '');

    if (!text)
        return;

    let data = {
        username: socket.username,
        message: text
    };
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', data)

    broadcast('new message', data);
    messages.push(data);
});

// when the client emits 'add user', this listens and executes
socket.on('add user', (username) => {
    console.log("username: " + username)

    // we store the username in the socket session for this client
    socket.username = username;
    users_online.push(username)
    users_all.push(username)
    console.log("users: "+ users_online.length)

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: users_online.length
    });

    broadcast('members', users_online);
    broadcast('all users', users_all);

});


// Update members list
socket.on('update members', () => {
    broadcast('members', users_online);
    broadcast('all users', users_all);
});

// Update messages list
socket.on('update messages', () => {
    broadcast('messages',  messages);
});

// when the client emits 'typing', we broadcast it to others
socket.on('typing', () => {
    socket.broadcast.emit('typing', {
    username: socket.username
    });
});

// when the client emits 'stop typing', we broadcast it to others
socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
    username: socket.username
    });
});

// when the user disconnects.. perform this
socket.on('disconnect', () => {
    console.log("disconnect")

    users_online.splice(users_online.indexOf(socket.username), 1)
    console.log("users: "+ users_online.length)

    sockets.splice(sockets.indexOf(socket), 1);

    // echo globally that this client has left
    socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: users_online.length
    });

    broadcast('members', users_online);
    broadcast('all users', users_all);

});
});

function broadcast(event, data) {
    sockets.forEach(function (socket) {
      socket.emit(event, data);
    });
}

module.exports = io;