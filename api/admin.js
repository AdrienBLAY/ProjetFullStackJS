/*
Ce fichier contiens toutes les routes qui sont accessibles que dans l'administrateur
Les routes sont
GET /users
POST /users
PUT  /users
DELETE  /users
NOTE:
Les routes des users ci dessus ne sont pas présent dans ce fichier, car ce sont des routes de l'API
Elles sont dans un fichier séparé, users.js

POST /topics
PUT /topics
DELETE /topics
DELETE /articles
*/


var multer  = require('multer');
var path = require('path');
var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './client/assets');
        },
        filename: function(req, file, cb) {
            cb(null, "logo.png");
        }
    });
var upload = multer({ storage: storage }).single('logo');


// Import du model topics
var Topics = require('../models/topic.js');
var Articles = require('../models/article.js');
var db = require('../db.js'); 

module.exports = function(app) {

  app.post('/topics',function(req,res){
    /*
    Cette route prend le nom et la description de la requete body
    Ensuite il fait un insert dans la bdd
    */
    Topics.where({name: req.body.name}).fetch({require: true}).then((topic) => {
      res.json({
         error: {
           error: true,
           message: `Topic ${topic.get('name')} existe !`
         },
         code: '',
         data: {}
       })
    })
    .catch((error) => {
      if (error.message === 'EmptyResponse') {
        Topics.forge().save({name: req.body.name, description: req.body.description}).then( function (topic) {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B121',
            data: topic.toJSON()
          });
        })
        .catch(function(error){
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B122',
            data: {}
          })
        })
      }
      else {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: '',
          data: {}
        })
      } 
    })
  });

  app.put('/topics',function(req,res){
    /*
    C'est une route PUT pour mettre à jour les info d'une topic
    Il prend l'id de la topic pour l'update et ensuite il l'update dans un nouvel object
    */
    Topics.forge({id: req.body.id})
    .save({name: req.body.name, description: req.body.description})
      .then(function(topic) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B125',
          data: topic
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B126',
          data: {

          }
        });
      });
  });


  app.delete('/topics',function(req,res){
    /*
    Route DELETE pour supprimer une topic de la bdd
    Elle prend l'id de la topic et la supprime de la bdd
    */
    if(req.body.id === 1) {
      res.status(403).json({
        error: {
          error: true,
          message: 'Vous ne pouvez pas supprimer le topic par défaut !'
        },
        code: '',
        data: {}
      })
    }
    else {
      Topics.forge({id: req.body.id})
      .destroy()
      .then(function() {
        Articles.forge().where({topic_id: req.body.id})
        .fetch().then((collection)=> {
          if(collection) {
            Articles.forge().where({topic_id: req.body.id})
            .save({topic_id: 1}, {patch: true})
            .then(() => {
              res.json({
                error: {
                  error: false,
                  message: ''
                },
                code: 'B127',
                data: {}
              });
            })
            .catch((error) => {
              res.status(500).json({
                error: {
                  error: true,
                  message: error.message
                },
                code: '',
                data: {}
              });
            })
          }
          else {
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B127',
              data: {}
            });
          }
        })


      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B128',
          data: {

          }
        });
      });
    }
  });


    app.delete('/articles',function(req,res){
      /*
      Route DELETE pour supprimer un article de la bdd
      Elle prend l'id de l'article et la supprime de la bdd
      */

      Articles.forge({id: req.body.id})
      .destroy()
        .then(function() {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B109',
            data: {

            }
          });
        })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B110',
            data: {

            }
          });
        });
    });

}
