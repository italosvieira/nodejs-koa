const BusinessException = require('../exceptions/businessException')
const ValidationError = require('mongoose').Error.ValidationError
const logger = require('../config/winston')

// TODO validate when database looses connection.
module.exports = function (ctx, error) {
  logger.error(error.message, error)

  if (error instanceof BusinessException) {
    ctx.throw(error.httpStatusCode, error.message)
  } else if (error instanceof ValidationError) {
    ctx.throw(400, error.message)
  } else {
    ctx.throw(500, error.message)
  }
}