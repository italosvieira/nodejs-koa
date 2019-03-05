const winston = require('winston')

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => transform(info))
  ),
  transports: [
    new winston.transports.Console()
  ]
})

function transform (msg) {
  if (msg.stack) {
    return `${msg.timestamp} ${msg.level}: ${msg.message} \n ${msg.stack}`
  }
  return `${msg.timestamp} ${msg.level}: ${msg.message}`
}