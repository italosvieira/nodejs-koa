const fs = require('fs')

module.exports = function () {
  process.env.ASYMMETRIC_PRIVATE_KEY = fs.readFileSync(process.env.PATH_ASYMMETRIC_PRIVATE_KEY).toString()
  process.env.ASYMMETRIC_PUBLIC_KEY = fs.readFileSync(process.env.PATH_ASYMMETRIC_PUBLIC_KEY).toString()
}