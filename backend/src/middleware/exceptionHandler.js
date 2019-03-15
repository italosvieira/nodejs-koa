const BusinessException = require('../exceptions/businessException')
const SecurityException = require('../exceptions/securityException')
const ValidationError = require('mongoose').Error.ValidationError
const logger = require('../config/winston')

module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      logger.error(error)

      if (error instanceof SecurityException) {
        handleSecurityException(ctx, error)
      } else {
        handleGenericException(ctx, error)
      }
    }
  }
}

function handleGenericException (ctx, error) {
  if (error instanceof BusinessException) {
    ctx.status = error.httpStatusCode
    ctx.body = createResponse(ctx.originalUrl, ctx.method, error.httpStatusCode, error.message)
  } else if (error instanceof ValidationError) {
    ctx.status = 400
    ctx.body = createResponse(ctx.originalUrl, ctx.method, 400, error.message)
  } else if (error.name === 'MongoNetworkError') {
    ctx.status = 503
    ctx.body = createResponse(ctx.originalUrl, ctx.method, 503, error.message)
  } else {
    ctx.status = 500
    ctx.body = createResponse(ctx.originalUrl, ctx.method, 500, error.message)
  }
}

function handleSecurityException (ctx, error) {
  ctx.body = createResponse()
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