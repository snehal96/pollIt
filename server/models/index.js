require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.User = require('./user');
module.exports.Poll = require('./poll');