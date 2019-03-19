const BusinessException = require('../exceptions/businessException')
const isMongoId = require('validator/lib/isMongoId')

module.exports = function (id) {
  if (!id) {
    throw new BusinessException(`Parameter id invalid. id: ${id}`, 'Parameter id must not be null.', 400)
  }

  if (!isMongoId(id)) {
    throw new BusinessException(`Parameter id is not a valid mongo id.: id: ${id}`, 'Parameter id is not a valid mongo id.', 400)
  }
}