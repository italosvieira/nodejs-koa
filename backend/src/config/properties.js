const isNullOrUndefined = require('../util/isNullOrUndefined')

const isDev = process.env.NODE_ENV === 'dev'
const isProd = process.env.NODE_ENV === 'prod'

module.exports = {
  isServerPropertiesInvalid: isNullOrUndefined(process.env.NODE_ENV),

  port: process.env.PORT || 3000,

  env: {
    isDev,
    isProd
  }
}