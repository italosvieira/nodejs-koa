const mongoose = require('mongoose')
const Properties = require('./properties')
const ServerUtils = require('../util/serverUtils')

exports.createModel = function (name, model) {
  mongoose.set('useFindAndModify', false)
  mongoose.connect(Properties.mongo.url, { useNewUrlParser: true, user: Properties.mongo.user, pass: Properties.mongo.password }).then(
    () => {
      console.log('Connected to fruits database.')
    },
    error => { ServerUtils.exit('Failed to connect to fruits database.', 1, error) }
  )
  return mongoose.model(name, model)
}