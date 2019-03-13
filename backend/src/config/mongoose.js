const mongoose = require('mongoose')
const properties = require('./properties')
const logger = require('./winston')
const exit = require('../utils/exit')

exports.createModel = function (name, model) {
  mongoose.set('useFindAndModify', false)
  mongoose.connect(properties.mongo.url, { useNewUrlParser: true, user: properties.mongo.user, pass: properties.mongo.password }).then(
    () => {
      logger.log('info', 'Connected to fruits database.')
    },
    error => { exit('Failed to connect to fruits database. ', 1, error) }
  )
  return mongoose.model(name, model)
}