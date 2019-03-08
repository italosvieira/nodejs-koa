const logger = require('../config/winston')

module.exports = function (ctx) {
  logger.log('info', `Request Method: ${ctx.method}, Request Route: ${ctx.originalUrl}, Request Parameters: ${JSON.stringify(ctx.params)}, Request Body: ${JSON.stringify(ctx.request.body)}`)
}