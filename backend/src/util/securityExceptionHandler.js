module.exports = function () {
  return async function (ctx, next) {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = 'Unauthorized: Access is denied due to invalid credentials.'
      } else {
        throw err
      }
    })
  }
}