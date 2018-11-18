const mongoose = require('mongoose')
const Properties = require('./properties')
const ServerUtils = require('../util/serverUtils')

exports.createModel = function (name, model) {
  mongoose.connect(Properties.mongo.url + '/' + Properties.mongo.dbName, { useNewUrlParser: true, user: Properties.mongo.user, pass: Properties.mongo.password }).then(
    () => {
      console.log('Conected')
    },
    error => { ServerUtils.exit('Failed to connect to database.', 1, error) }
  )
  return mongoose.model(name, model)
}