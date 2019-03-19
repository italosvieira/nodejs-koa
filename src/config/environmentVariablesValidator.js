const logger = require('./winston')

module.exports = function () {
  if (!process.env.NODE_ENV) {
    logger.error('Environment property { NODE_ENV } not defined.')
    process.exit(1)
  }

  if (!process.env.PATH_ASYMMETRIC_PRIVATE_KEY) {
    logger.error('Environment property { PATH_ASYMMETRIC_PRIVATE_KEY } not defined.')
    process.exit(1)
  }

  if (!process.env.PATH_ASYMMETRIC_PUBLIC_KEY) {
    logger.error('Environment property { PATH_ASYMMETRIC_PUBLIC_KEY } not defined.')
    process.exit(1)
  }

  if (!process.env.MONGO_URL) {
    logger.error('Environment property { MONGO_URL } not defined.')
    process.exit(1)
  }

  if (!process.env.MONGO_USER) {
    logger.error('Environment property { MONGO_USER } not defined.')
    process.exit(1)
  }

  if (!process.env.MONGO_PASSWORD) {
    logger.error('Environment property { MONGO_PASSWORD } not defined.')
    process.exit(1)
  }
}