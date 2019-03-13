const logger = require('../config/winston')

module.exports = function (msg, code, error) {
  logger.log('error', msg, error)
  process.exit(code)
}