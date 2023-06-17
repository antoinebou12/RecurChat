const io = require('socket.io')();

let sockets = new Map();
let users_all = new Set();
let users_online = new Set();
let messages = [];

io.on('connection', (socket) => {
    console.log("Connection");
    sockets.set(socket.id, socket);
    console.log("Sockets connected: " + sockets.size);

    handleNewMessage(socket);
    handleAddUser(socket);
    handleTyping(socket);
    handleDisconnect(socket);
});

function handleNewMessage(socket) {
    socket.on('new message', (message) => {
        console.log("New message: " + message);
        let text = String(message || '');
        if (!text) return;
        let data = { username: socket.username, message: text };
        socket.broadcast.emit('new message', data);
        messages.push(data);
    });
}

function handleAddUser(socket) {
    socket.on('add user', (username) => {
        console.log("Username: " + username);
        socket.username = username;
        users_online.add(username);
        users_all.add(username);
        console.log("Users online: "+ users_online.size);
        socket.broadcast.emit('user joined', { username: socket.username });
        broadcast('members', Array.from(users_online));
        broadcast('all users', Array.from(users_all));
    });
}

function handleTyping(socket) {
    socket.on('typing', () => socket.broadcast.emit('typing', { username: socket.username }));
    socket.on('stop typing', () => socket.broadcast.emit('stop typing', { username: socket.username }));
}

function handleDisconnect(socket) {
    socket.on('disconnect', () => {
        console.log("Disconnect");
        users_online.delete(socket.username);
        console.log("Users online: "+ users_online.size);
        sockets.delete(socket.id);
        socket.broadcast.emit('user left', { username: socket.username });
        broadcast('members', Array.from(users_online));
        broadcast('all users', Array.from(users_all));
    });
}

function broadcast(event, data) {
    for (let socket of sockets.values()) {
        socket.emit(event, data);
    }
}

module.exports = io;
