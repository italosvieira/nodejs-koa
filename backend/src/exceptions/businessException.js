module.exports = class BusinessException {
  constructor (message, clientMessage, httpStatusCode) {
    this.message = message
    this.clientMessage = clientMessage
    this.httpStatusCode = httpStatusCode
    this.stack = (new Error()).stack
  }
}