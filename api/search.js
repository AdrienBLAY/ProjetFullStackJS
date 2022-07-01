var Articles = require('../models/article.js');

module.exports = function(app) {

  app.get('/search',function(req,res){
    /*
    Route GET qui prend la requête de recherche comme un paramètre URL
    Lance une recherche et retourne les articles qui correspondent à la recherche
    */
    var SearchQuery = req.query.query;
    SearchQuery = "%"+SearchQuery+"%";
    Articles.query(function(qb) {
            qb.where('title', 'LIKE', SearchQuery).orWhere('body','LIKE',SearchQuery);
        }).fetchAll()
        .then(function (collection) {
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
              message: "Une erreur s'est produite lors de la recherche. Veuillez réessayer."
            },
            code: 'B132',
            data: {

            }
          });
        });
});

}
