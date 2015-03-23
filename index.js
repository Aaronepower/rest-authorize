/* jshint node: true, browser: false */
var norm = require('debug')('rest-auth:*')
  , verb = require('debug')('rest-auth:verb')
module.exports = function (Model, options) {
  options = options || {}
  

  return function (req, res, next) {
    var authHeader = req.get('authorization')
    if (typeof authHeader === 'undefined'){
      res.status(403).end()
    }
    else {
      norm('Authorization Header:', authHeader)
      var authValue = authHeader.split(' ')
        , token = authValue[1]
        , queryName = options.query || 'token'
        , query = {}

      verb('Token: ', token)

      verb(' Query Name:', queryName)
      query[queryName] = token

      norm('Query object', query)

      Model.findOne(query, function (err, result) {
        if (err)
          res.send(err)

        if (!result) {
          res.status(404).end()
        }
        else {
          verb('result property name:', Model.modelName.toLowerCase())
          var modelName = Model.modelName.toLowerCase() 

          req[modelName] = result
          norm(modelName, ' found and added to request:\n')
          next()
        }
      })
    }
  }
}
