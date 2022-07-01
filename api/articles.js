/*
Ce fichier contiens toutes les routes sur les articles.
La route pour afficher les articles d'un topic particulier (/topics/:id/articles)
*/


var Articles = require('../models/article.js');
var Topics = require('../models/topic.js');
var Archives = require('../models/archive.js');
var Users = require('../models/user.js');

var db = require('../db.js');

module.exports =  function(app){

  app.post('/articles',function(req,res){
    /*
    Cette route prend le title, le body et l'id du topic de la requete body
    Ensuite il fait un insert dans la bdd
    */
    Articles.forge().save({
        title: req.body.title,
        body: req.body.body,
        topic_id: req.body.topic_id,
        user_id: req.body.user_id,
        what_changed: ""
      }).then( function (article) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B103',
          data: article
        });
     })
     .catch(function (error) {
       res.status(500).json({
         error: {
           error: true,
           message: error.message
         },
         code: 'B104',
         data: {

         }
       });
     });
  });


  app.get('/articles',function(req,res){
    /*
    Route GET qui retourne une liste de tous les articles dans la table articles
    */
    Articles.forge()
    .query(function(qb) {
        if(req.query.count)
          qb.limit(req.query.count);
        qb.orderBy('updated_at','DESC');
    })
    .fetchAll()
      .then(function (collection) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: 'B105',
          data: collection.toJSON()
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B106',
          data: {

          }
        });
      });
  });


  app.put('/articles',function(req,res){
    /*
    C'est une route PUT pour mettre à jour les info d'un article
    */
    Articles.forge({id: req.body.id}).fetch().then(function(article){
        Articles.forge({id: req.body.id})
          .save({
            title: req.body.title,
            body: req.body.body,
            topic_id: req.body.topic_id,
            what_changed: req.body.what_changed,
            user_id: req.body.user_id
          })
          .then(function() {
              Archives.forge().save({
                article_id: req.body.id,
                title: article.attributes.title,
                body: article.attributes.body,
                what_changed: article.attributes.what_changed,
                user_id: article.attributes.user_id
              })
              .then(function(article){
                  res.json({
                    error: {
                      error: false,
                      message: ''
                    },
                    code: 'B107',
                    data: article
                  });
              })
            })
    })
    .catch(function(error){
      res.status(500).json({
        error: {
          error: true,
          message: error.message
        },
        code: 'B108',
        data: {

        }
      });
    });
  });


  app.get('/articles/:id/',function(req,res){
    /*
    Route GET qui retourne un article avec l'id
    */
    Articles.forge({id: req.params.id})
    .fetch()
      .then(function (article) {
        Topics.forge({id: article.attributes.topic_id}).fetch().then(function(topic){
          articleObj = article.toJSON();
          topicObj = topic.toJSON();
          articleObj.topic = topicObj;
        }).then(function(){
          Users.forge({id: articleObj.user_id}).fetch().then(function(user){
            userObj = user.toJSON();
            articleObj.user = {
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
              data: articleObj
            });
        })
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


  app.get('/articles/:id/history',function(req,res){
    /*
    Route GET qui retourne les anciennes version de l'article avec l'id
    */

    Articles.where({id: req.params.id}).fetch({withRelated: [{'archives': function(qb) {
             qb.orderBy("updated_at","DESC");
         }}]}).then(function(article) {
      res.status(200).json({
        error: {
          error: false,
          message: ''
        },
        code: 'B115',
        data: article.related('archives')
      });
    })
    .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B116',
          data: {

          }
        });
    });
  });



}
