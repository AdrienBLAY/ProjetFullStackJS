/*
Ce fichier contiens les routes pour la création du setup de base
*/

var Users = require('../models/user.js');
var Topics = require('../models/topic.js');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var db = require('../db.js');

module.exports = function(app) {

  app.post('/setup',function(req,res){
    /*
    Cette route post créer un user qui sera admin et crée un topic général
    */
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.forge()
        .save({
          id: 1,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          about: req.body.about
        })
        .then(function (collection) {
          Topics.forge().save({name: "Général", description: "Topic général"}).then(function(topic){
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B131',
              data: collection.toJSON()
            });
          })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: "Une erreur s'est produite lors de la création de l'admin. Il est probable que vous l'ayez déjà configuré"
            },
            code: 'B132',
            data: {

            }
          })
        });
      });
        });
      });

}
