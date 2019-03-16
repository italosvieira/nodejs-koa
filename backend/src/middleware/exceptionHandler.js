const BusinessException = require('../exceptions/businessException')
const ValidationError = require('mongoose').Error.ValidationError
const logger = require('../config/winston')

module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      logger.error(error)

      if (error instanceof BusinessException) {
        ctx.status = error.httpStatusCode
        ctx.body = createResponse(ctx.originalUrl, ctx.method, error.httpStatusCode, error.clientMessage)
      } else if (error instanceof ValidationError) {
        ctx.status = 400
        ctx.body = createResponse(ctx.originalUrl, ctx.method, 400, error.message)
      } else if (error.name === 'MongoNetworkError') {
        ctx.status = 503
        ctx.body = createResponse(ctx.originalUrl, ctx.method, 503, 'Service is unavailable. Try again later.')
      } else {
        ctx.status = 500
        ctx.body = createResponse(ctx.originalUrl, ctx.method, 500, 'A unexpected error has occurred.')
      }
    }
  }
}

function createResponse (path, method, statusCode, errorMessage) {
  return {
    'timestamp': new Date().toISOString(),
    'path': path,
    'method': method,
    'statusCode': statusCode,
    'error': errorMessage
  }
}