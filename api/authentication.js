/*
Cette route contiens toutes les routes pour l'authentification des users
*/


var Users = require('../models/user.js');
var jwt    = require('jsonwebtoken'); // utilisé pour créer, signer et verifier les tokens
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var db = require('../db.js');

module.exports = function(app) {


  app.post('/api/authenticate',function(req,res){
    /*
    Cette route prend l'email et le mot de passe et retourne un token
    */
    Users.forge({email: req.body.email})
    .fetch()
      .then(function (user) {
        if(!user){
          res.json({
            error: {
              error: true,
              message: 'Utilisateur non trouvé'
            },
            code: 'B117',
            data: {

            }
          });
        }
        else {
          user = user.toJSON();
          bcrypt.compare(req.body.password, user.password, function(err, result) {
              {
                var token = jwt.sign(user, app.get('superSecret'), {
                              expiresIn: 86400
                            });
                res.json({
                  error: {
                    error: false,
                    message: ''
                  },
                  code: 'B118',
                  data: {
                    user: {
                      email: user.email,
                      id: user.id
                    },
                    token: token
                  }
                });
              }
          });
        }

      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B120',
          data: {

          }
        });
      });
  });


}
