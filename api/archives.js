/*
Ce fichier contiens toutes les routes sur les archives
*/

var Articles = require('../models/article.js');
var Topics = require('../models/topic.js');
var Archives = require('../models/archive.js');
var Users = require('../models/user.js');

var db = require('../db.js');

module.exports =  function(app){
  app.get('/archives/:id/',function(req,res){
    /*
    Route GET qui retourne une archive grâce à l'id
    */
    Archives.forge({id: req.params.id})
    .fetch()
      .then(function (archive) {
        Users.forge({id: archive.attributes.user_id}).fetch().then(function(user){
          archiveObj = archive.toJSON();
          userObj = user.toJSON();
          archiveObj.user = {
            id: userObj.id,
            name: userObj.name,
            email: userObj.email,
            about: userObj.about
          };
        })
        .then(function(){
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B113',
              data: archiveObj
            });
        })
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B114',
          data: {

          }
        });
      });
  });
}
