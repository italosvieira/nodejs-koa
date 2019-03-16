const mongoose = require('mongoose')
const logger = require('./winston')

module.exports = async function () {
  logger.info('Establishing database connection.')

  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD }).then(
    () => {
      logger.info('Fruits database connection established successfully.')
    },
    error => {
      logger.error('Failed to establishing connection to fruits database. ', error)
      process.exit(1)
    }
  )
}