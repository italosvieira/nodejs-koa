const fs = require('fs')
const logger = require('./winston')

module.exports = function () {
  try {
    process.env.ASYMMETRIC_PRIVATE_KEY = fs.readFileSync(process.env.PATH_ASYMMETRIC_PRIVATE_KEY).toString()
  } catch (e) {
    logger.error('Could not load asymmetric private key file.')
    process.exit(1)
  }

  try {
    process.env.ASYMMETRIC_PUBLIC_KEY = fs.readFileSync(process.env.PATH_ASYMMETRIC_PUBLIC_KEY).toString()
  } catch (e) {
    logger.error('Could not load asymmetric public key file.')
    process.exit(1)
  }
}