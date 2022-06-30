/*
Ce fichier contiens toutes les routes relatives au topics
*/

var Topics = require('../models/topic.js');

var db = require('../db.js');

module.exports = function(app) {


  app.get('/topics',function(req,res){
    /*
    Route GET qui retourne la liste de tous les topics de la table de topics 
    */
    Topics.forge()
    .fetchAll()
      .then(function (collection) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B123',
          data: collection.toJSON()
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B124',
          data: {

          }
        });
      });
  });


  app.get('/topics/:id',function(req,res){
      /*
      Route GET qui retourne un topic avec l'id donnée
      */
      Topics.forge({id: req.params.id})
      .fetch()
        .then(function (topic) {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B123',
            data: topic.toJSON()
          });
        })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B124',
            data: {

            }
          });
        });
    });


  app.get('/topic/:id/articles',function(req,res){
    /*
    Route GET qui retourne la liste de tous les articles avec un topic particulier 
    */
    Topics.where({id: req.params.id}).fetch({withRelated: [{'articles': function(qb) {
            if(req.query.count)
                qb.limit(req.query.count);
             qb.orderBy("updated_at","DESC");
         }}]}).then(function(topic) {
      res.status(200).json({
        error: {
          error: false,
          message: ''
        },
        code: 'B129',
        data: topic.related('articles')
      });
    })
    .catch(function(error){
      res.status(500).json({
        error: {
          error: true,
          message: error.message
        },
        code: 'B130',
        data: {

        }
      })
    });
  });


}
