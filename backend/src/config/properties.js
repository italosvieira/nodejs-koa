const isNullOrUndefined = require('../util/isNullOrUndefined')

const nodeEnv = process.env.NODE_ENV
const isDev = nodeEnv === 'dev'
const isProd = nodeEnv === 'prod'

module.exports = {
  isServerPropertiesInvalid: isNullOrUndefined(nodeEnv) || isNullOrUndefined(process.env.MONGO_URL) || isNullOrUndefined(process.env.MONGO_USER) || isNullOrUndefined(process.env.MONGO_PASSWORD),

  port: process.env.NODE_PORT || 3000,

  env: {
    isDev,
    isProd
  },

  mongo: {
    url: process.env.MONGO_URL,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
  }
}