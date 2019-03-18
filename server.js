const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const engines = require('consolidate');

const express = require('express');

const app = express();
const server = http.createServer(app);

const SocketIO = require("./app/socket/socket.js");

// Set the ip and port number
const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'app/views')));

SocketIO.init(server);

//database connection
let database = require('./app/database/Database.js');

//Application components
var routes = require('./app/routes');

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

//router
app.use('/', routes);

// Middleware to catch 404 errors
app.use(function (req, res) {
  res.status(404).sendFile(process.cwd() + '/app/views/404.html');
});

//server
server.listen(port, ip, function () {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});