const logger = require('../config/winston')

module.exports = {
  exit: function (msg, code, error) {
    logger.log('error', msg, error)
    process.exit(code)
  },

  // TODO fix the return error
  handleError: function (ctx, status, error) {
    logger.log('error', error)

    ctx.status = status
    ctx.body = {
      message: error.message
    }
  }
}