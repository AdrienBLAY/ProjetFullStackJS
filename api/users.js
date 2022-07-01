/*
Ce fichier contiens toutes les routes relative au users
*/

var Users = require('../models/user.js');
var bcrypt = require('bcryptjs');
var Articles = require('../models/article.js');
const saltRounds = 10;
var db = require('../db.js');

module.exports = function(app) {


  app.post('/users',function(req,res){
    /*
    Route POST qui crée un user
    */
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.forge()
        .save({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          about: req.body.about})
        .then(function (collection) {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B131',
            data: collection.toJSON()
          })
        })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B132',
            data: {

            }
          })
        });
        });
      });


  app.get('/users',function(req,res){
    /*
    Route GET qui retourne la liste de tous les users de la table users
    */
    Users.forge()
    .query(function(qb) {
        qb.select('id','name','about','email');
        qb.orderBy('created_at','DESC');
    })
    .fetchAll()
      .then(function (collection) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B133',
          data: collection.toJSON()
        })
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B134',
          data: {

          }
        })
      });
      });


  app.put('/users',function(req,res){
    /*
    Route PUT qui permet de modifier un user
    */
    if(req.body.password!=null){
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        Users.forge({id: req.body.id})
          .save({name: req.body.name, email: req.body.email, password: hash, about: req.body.about})
          .then(function (collection) {
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B135',
              data: {
                name: req.body.name,
                email: req.body.email,
                about: req.body.about
              }
            })
          })
          .catch(function (error) {
            res.status(500).json({
              error: {
                error: true,
                message: error.message
              },
              code: 'B136',
              data: {

              }
            })
          });
      });
    }
    else {
      Users.forge({id: req.body.id})
        .save({name: req.body.name, email: req.body.email, about: req.body.about})
        .then(function (collection) {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B135',
            data: collection.toJSON()
          })
        })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B136',
            data: {

            }
          })
        });
    }
    });

    app.delete('/users',function(req,res){
      /*
      Route DELETE permet de supprimer un user de bdd
      */
      Users.where({id: req.body.id}).fetch({withRelated: ['articles']}).then(function(user) {
        var user = user.toJSON();
        var articles = user.articles;
        for(var i=0; i<articles.length; i++)
        {
          Articles.forge({id: articles[i].id}).save({
            title: articles[i].title,
            body: articles[i].body,
            topic_id: articles[i].topic_id,
            what_changed: articles[i].what_changed,
            user_id: 1
          });
        }
      }).then(function(){
        Users.forge({id: req.body.id})
        .destroy()
          .then(function() {
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B137',
              data: {}
            });
          })
      })
      .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B138',
            data: {

            }
          })
        });
      });


        app.get('/users/:id',function(req,res){
          /*
          Route GET qui retourne un user avec l'id donné
          */
          Users.forge({id: req.params.id})
          .query(function(qb) {
              qb.select('id','name','about','email');
          })
          .fetch()
            .then(function (user) {
              res.json({
                error: {
                  error: false,
                  message: ''
                },
                code: 'B133',
                data: user.toJSON()
              })
            })
            .catch(function (error) {
              res.status(500).json({
                error: {
                  error: true,
                  message: error.message
                },
                code: 'B134',
                data: {

                }
              })
            });
            });



}
