var mongoose = require('mongoose');

const server = 'localhost'; 
const port = '27017';
const database = 'RecurChation';  

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://${server}:${port}/${database}`, { useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

let db = new Database()
module.exports = db


