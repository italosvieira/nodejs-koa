module.exports = {
  exit: function (msg, code, error) {
    console.log(msg, error)
    process.exit(code)
  },

  // TODO fiz the return error
  handleError: function (ctx, status, error) {
    console.log(error.stack)

    ctx.status = status
    ctx.body = {
      message: error.message
    }
  }
}