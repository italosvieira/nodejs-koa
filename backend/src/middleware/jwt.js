const jwt = require('jsonwebtoken')
const BusinessException = require('../exceptions/businessException')

module.exports = function () {
  return async (ctx, next) => {
    const authorizationHeader = ctx.request.headers.authorization

    if (!authorizationHeader) {
      throw new BusinessException(`No Authorization Header found. Authorization Header: ${authorizationHeader}.`, 'Invalid credentials.', 401)
    }

    const token = authorizationHeader.replace('Bearer ', '')

    try {
      ctx.state.user = jwt.verify(token, Buffer.from(process.env.ASYMMETRIC_PUBLIC_KEY), { algorithm: 'RS256' }).user
      return next()
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new BusinessException(`${e.message}. Token: ${token}.`, 'Invalid credentials.', 401)
      }

      if (e.name === 'NotBeforeError') {
        throw new BusinessException(`Token current time is before the nbf claim. Token: ${token}.`, 'Invalid credentials.', 403)
      }

      if (e.name === 'TokenExpiredError') {
        throw new BusinessException(`Token expired. Token: ${token}.`, 'Token expired.', 403)
      }
    }
  }
}