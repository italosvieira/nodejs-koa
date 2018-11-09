const isNullOrUndefined = require('../util/isNullOrUndefined')

const nodeEnv = process.env.NODE_ENV
const isDev = nodeEnv === 'dev'
const isProd = nodeEnv === 'prod'

module.exports = {
  isServerPropertiesInvalid: isNullOrUndefined(nodeEnv),

  port: process.env.NODE_PORT || 3000,

  env: {
    isDev,
    isProd
  }
}