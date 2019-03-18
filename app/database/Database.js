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