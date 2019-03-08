const Koa = require('koa')
const koaHelmet = require('koa-helmet')
const koaCors = require('@koa/cors')
const koaBodyParser = require('koa-bodyparser')

const properties = require('./config/properties')
const router = require('./routes/router')
const logger = require('./config/winston')
const exit = require('./util/exit')

if (properties.isServerPropertiesInvalid) {
  exit('Server Properties invalid.', 1)
}

const koa = new Koa()
koa.use(koaHelmet())
koa.use(koaCors())
koa.use(koaBodyParser())
koa.use(router.routes())
koa.use(router.allowedMethods())
koa.listen(properties.port, () => logger.log('info', `Application running on port ${properties.port}.`))

module.exports = koa