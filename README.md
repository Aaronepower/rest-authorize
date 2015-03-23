# rest-authorize
Express module for REST API apps needing authorisation with [JWT](jwt.io).


## How to use:

	var authorize = require('rest-authorize')(MongooseModel, options)

`MongooseModel` The model you want to search in for the token.

## Options

`query` Provide the name of the property the token is located in. (Defaults to `token`)