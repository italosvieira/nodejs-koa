const BusinessException = require('../exception/businessException')
const isNullOrUndefined = require('../util/isNullOrUndefined')
const isMongoId = require('validator/lib/isMongoId')

module.exports = function (id) {
  if (isNullOrUndefined(id)) {
    throw new BusinessException('Parameter id must not be null.', 400)
  }

  if (!isMongoId(id)) {
    throw new BusinessException('Parameter id is not a valid mongo id.', 400)
  }
}