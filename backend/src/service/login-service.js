const jwt = require('jsonwebtoken')
const logRequest = require('../util/logRequest')

module.exports = {
  post: async function (ctx) {
    logRequest(ctx)

    ctx.body = {
      token: jwt.sign({ roles: ['admin'], iat: Math.floor(Date.now() / 1000) - 30 }, Buffer.from(process.env.ASYMMETRIC_PRIVATE_KEY), { algorithm: 'RS256' })
    }
  }
}