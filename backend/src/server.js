const Koa = require('koa')
const koaLogger = require('koa-logger')
const Helmet = require('koa-helmet')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const logger = require('./config/winston')

const Properties = require('./config/properties')
const Router = require('./routes/router')

if (Properties.isServerPropertiesInvalid) {
  logger.log('error', 'Server Properties invalid.')
  process.exit(1)
}

const koa = new Koa()
koa.use(koaLogger())
koa.use(Helmet())
koa.use(Cors())
koa.use(BodyParser())
koa.use(Router.routes())
koa.use(Router.allowedMethods())

koa.listen(Properties.port, () => logger.log('info', `Server running on port ${Properties.port}`))

module.exports = koa