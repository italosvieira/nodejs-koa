const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const BusinessException = require('../exceptions/businessException')

module.exports = {
  login: async function (ctx) {
    // TODO token with secure cookies.
    const user = await validateUserCredentials(ctx.request.body.email, ctx.request.body.password)

    const token = {
      token: jwt.sign({
        sub: user._id,
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000) - 30,
        user: { id: user._id, roles: user.roles || [], permissions: user.permissions || [] } },
      Buffer.from(process.env.ASYMMETRIC_PRIVATE_KEY),
      { algorithm: 'RS256' })
    }
  },

  token: async function (ctx) {
    const user = await validateUserCredentials(ctx.request.body.email, ctx.request.body.password)

    ctx.body = {
      token: jwt.sign({
        sub: user._id,
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000) - 30,
        user: { id: user._id, roles: user.roles || [], permissions: user.permissions || [] } },
      Buffer.from(process.env.ASYMMETRIC_PRIVATE_KEY),
      { algorithm: 'RS256' })
    }
  },

  validateUserCredentials: async function (email, password) {
    return validateUserCredentials(email, password)
  }
}

async function validateUserCredentials (email, password) {
  const user = await userModel.findOne({ email: email })

  if (!user) {
    throw new BusinessException(`Invalid Credentials. User not found. Email: ${email}`, 'Invalid Credentials.', 401)
  }

  if (!user.active) {
    throw new BusinessException(`User is deactivated. Email: ${user.email}, Active: ${user.active}`, 'User is deactivated.', 403)
  }

  const match = await bcrypt.compare(password, user.password)

  if (match) {
    return user
  } else {
    throw new BusinessException(`Invalid Credentials. Bcrypt compare did not match. Email: ${user.email}`, 'Invalid Credentials.', 401)
  }
}