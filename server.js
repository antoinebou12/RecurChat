const path = require('path');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static(path.resolve(__dirname, 'app/views')));

// Database connection setup
const database = require('./app/database/Database.js');

// Application components
const routes = require('./app/routes');

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

// Router setup
app.use('/', routes);

// Middleware to catch 404 errors
app.use(function (req, res) {
  res.status(404).sendFile(path.join(process.cwd(), '/app/views/404.html'));
});

// Socket.io setup 
const SocketIO = require("./app/socket/socket.js");
SocketIO.attach(server);

// Start the server
server.listen(port, ip, async function () {
  const addr = await server.address();
  console.log(`Chat server listening at ${addr.address}:${addr.port}`);
});
