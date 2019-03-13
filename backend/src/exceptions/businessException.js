module.exports = class BusinessException {
  constructor (message, httpStatusCode) {
    this.message = message
    this.httpStatusCode = httpStatusCode
    this.stack = (new Error()).stack
  }
}