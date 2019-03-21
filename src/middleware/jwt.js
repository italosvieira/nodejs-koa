const jwt = require('jsonwebtoken')
const BusinessException = require('../exceptions/businessException')

module.exports = function () {
  return async (ctx, next) => {
    const exceptionBag = []
    const tokenFromCookies = ctx.cookies.get('token')
    const authorizationHeader = ctx.request.headers.authorization

    if (!tokenFromCookies && !authorizationHeader) {
      throw new BusinessException(`No authorization token found on request. Token From Cookies: ${tokenFromCookies}, Authorization Header: ${authorizationHeader}.`, 'Invalid Credentials.', 401)
    }

    if (tokenFromCookies) {
      await validateToken(ctx, tokenFromCookies, exceptionBag)
    }

    if (authorizationHeader) {
      await validateToken(ctx, authorizationHeader.replace('Bearer ', ''), exceptionBag)
    }

    if (exceptionBag.length) {
      throw exceptionBag[0]
    }

    return next()
  }
}

async function validateToken (ctx, token, exceptionBag) {
  try {
    ctx.state.user = jwt.verify(token, Buffer.from(process.env.ASYMMETRIC_PUBLIC_KEY), { algorithm: 'RS256' }).user
  } catch (e) {
    if (e.name === 'NotBeforeError') {
      throw new BusinessException(`Token current time is before the nbf claim. Token: ${token}.`, 'Invalid Credentials.', 403)
    }

    if (e.name === 'TokenExpiredError') {
      throw new BusinessException(`Token expired. Token: ${token}.`, 'Token expired.', 403)
    }

    if (e.name === 'JsonWebTokenError') {
      exceptionBag.push(new BusinessException(`${e.message}. Token: ${token}.`, 'Invalid Credentials.', 401))
      return
    }

    exceptionBag.push(new BusinessException(`Unknown error. Error message: ${e.message}.`, 'Invalid credentials.', 401))
  }
}