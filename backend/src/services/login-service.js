const jwt = require('jsonwebtoken')

module.exports = {
  post: async function (ctx) {
    ctx.body = {
      token: jwt.sign({ roles: ['admin'], iat: Math.floor(Date.now() / 1000) - 30 }, Buffer.from(process.env.ASYMMETRIC_PRIVATE_KEY), { algorithm: 'RS256' })
    }
  }
}