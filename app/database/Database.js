const mongoose = require('mongoose');
const config = require('../config/config.json');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error: ', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', connectDB);

module.exports = connectDB;
