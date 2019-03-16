const jwt = require('jsonwebtoken')

module.exports = {
  post: async function (ctx) {
    ctx.body = {
      token: jwt.sign({
        sub: 'userID',
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000) - 30,
        user: f() },
      Buffer.from(process.env.ASYMMETRIC_PRIVATE_KEY),
      { algorithm: 'RS256' })
    }
  }
}

function f () {
  return { userId: '1', roles: ['Admin'], permissions: [] }
}