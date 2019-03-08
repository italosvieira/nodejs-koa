const logger = require('../config/winston')

module.exports = function (ctx, status, error) {
  logger.log('error', error)

  ctx.status = status
  ctx.body = {
    message: error.message
  }
}