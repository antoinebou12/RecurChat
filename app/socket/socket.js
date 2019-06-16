const async = require('async');
const io = require('socket.io')();

// Chatroom

let numUsers = 0;
let sockets = [];
let catalogue = [];

io.on('connection', (socket) => {
var addedUser = false;
console.log("connection")

sockets.push(socket)
console.log(sockets.length)

// when the client emits 'new message', this listens and executes
socket.on('new message', (data) => {
    console.log("new message: " + data)
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
    username: socket.username,
    message: data
    });
});

// when the client emits 'add user', this listens and executes
socket.on('add user', (username) => {
    console.log("username: " + username)
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
        numUsers: numUsers
    });

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
    });

    updateMembers();
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
    if (addedUser) {
    --numUsers;
    sockets.splice(sockets.indexOf(socket), 1);

    // echo globally that this client has left
    socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
    });
    }
});
});

function updateMembers() {
    async.map(
      sockets,
      function (socket, callback) {
        socket.username
      },
      function (err, names) {
        broadcast('members', names);
      }
    );
}

function broadcast(event, data) {
    sockets.forEach(function (socket) {
      socket.emit(event, data);
    });
}

module.exports = io;