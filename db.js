//var config      = require('./knexfile.js'); 
//var knex        = require('knex')(config); 
const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb+srv://root:vJ0OjRA98c0hhzdy@cluster0.rqp3l3e.mongodb.net/?retryWrites=true&w=majority');;

//knex.migrate.latest([config]);
