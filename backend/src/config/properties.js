const fs = require('fs')
const isNullOrUndefined = require('../utils/isNullOrUndefined')

const nodeEnv = process.env.NODE_ENV
const isDev = nodeEnv === 'dev'
const isProd = nodeEnv === 'prod'

module.exports = {
  isServerPropertiesInvalid: isNullOrUndefined(nodeEnv) || isNullOrUndefined(process.env.PATH_ASYMMETRIC_PRIVATE_KEY) || isNullOrUndefined(process.env.PATH_ASYMMETRIC_PUBLIC_KEY) ||
    isNullOrUndefined(process.env.MONGO_URL) || isNullOrUndefined(process.env.MONGO_USER) || isNullOrUndefined(process.env.MONGO_PASSWORD),

  port: process.env.NODE_PORT || 3000,

  env: {
    isDev,
    isProd
  },

  mongo: {
    url: process.env.MONGO_URL,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
  },

  loadAsymmetricKeys: function () {
    process.env.ASYMMETRIC_PRIVATE_KEY = fs.readFileSync(process.env.PATH_ASYMMETRIC_PRIVATE_KEY).toString()
    process.env.ASYMMETRIC_PUBLIC_KEY = fs.readFileSync(process.env.PATH_ASYMMETRIC_PUBLIC_KEY).toString()
  }
}