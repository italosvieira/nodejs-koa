const jwt = require('jsonwebtoken')
const fs = require('fs')
const logRequest = require('../util/logRequest')

module.exports = {
  post: async function (ctx) {
    logRequest(ctx)

    const privateKey = fs.readFileSync('../server.js')
    const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' })

    ctx.body = {
      token: token
    }
  }
}