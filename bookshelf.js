var config      = require('./knexfile.js'); 
var knex        = require('knex')(config);
var bookshelf   = require('bookshelf')(knex);

module.exports = bookshelf;
