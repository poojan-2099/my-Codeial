const mongoose = require('mongoose');

//connect to database using connect
mongoose.connect('mongodb://localhost/codeial_User');

//get data of database in db ussing connection
const db = mongoose.connection;

//on error occur show error in console
db.on('error', console.error.bind(console, 'connection error:'));

//run function when connection successfull
db.once('open', function() {
  // we're connected!
  console.log('Our Database Connection Is Successfully Esatablished')
});
module.exports = db;