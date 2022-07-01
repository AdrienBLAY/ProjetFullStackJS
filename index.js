
/*
fichier principal qui contiens toutes les routes
*/

var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var app = express();
var fs = require('fs');
var apiRoutes = express.Router();
var apiRoutesAdmin = express.Router();
var jwt = require('jsonwebtoken');
var misc = require('./misc.js');
var config = require('./config');

process.env.PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV !== 'production') {
  require('./webpack-middleware')(app);
}

app.set('superSecret', config.auth_secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api',function(req,res){
  res.send("Lien API");
});

require('./api/authentication')(app);

require('./api/setup')(app);

apiRoutes.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          error: {
            error: true,
            message: 'Échec de l\'authentification du token'
          },
          code: 'B101',
          data: {

          }
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).json({
      error: {
        error: true,
        message: 'Aucun token fourni'
      },
      code: 'B102',
      data: {

      }
    });

  }
});


apiRoutesAdmin.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          error: {
            error: true,
            message: 'Failed to authenticate token'
          },
          code: 'B101',
          data: {

          }
        });
      } else {
        if(decoded.id == 1) {
          req.decoded = decoded;
          next();
        }
        else {
          return res.status(403).json({
            error: {
              error: true,
              message: 'You are not authorized to perform this action'
            },
            code: 'BNOTADMIN',
            data: {

            }
          });
        }
      }
    });

  } else {
    return res.status(403).json({
      error: {
        error: true,
        message: 'No token provided'
      },
      code: 'B102',
      data: {

      }
    });

  }
});


require('./api/articles')(apiRoutes);

require('./api/topics')(apiRoutes);

require('./api/users')(apiRoutesAdmin);

require('./api/archives')(apiRoutes);

require('./api/search')(apiRoutes);

require('./api/admin')(apiRoutesAdmin);


app.use('/api', apiRoutes);
app.use('/api', apiRoutesAdmin);

app.use(express.static(__dirname + '/client'));

app.listen(process.env.PORT, function(){
  console.log("Serveur lancé sur le port %s", process.env.PORT);
});
