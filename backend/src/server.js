const Koa = require('koa')
const koaHelmet = require('koa-helmet')
const koaCors = require('@koa/cors')
const koaBodyParser = require('koa-bodyparser')
const Jwt = require('koa-jwt')

const properties = require('./config/properties')
const publicRoutes = require('./routes/public-router')
const privateRoutes = require('./routes/private-router')
const logger = require('./config/winston')
const exit = require('./util/exit')
const SecurityExceptionHandler = require('./util/securityExceptionHandler')

properties.loadAsymmetricKeys()

if (properties.isServerPropertiesInvalid) {
  exit('Server Properties invalid.', 1)
}

const app = new Koa()
app.use(koaHelmet())
app.use(koaCors())
app.use(koaBodyParser())
app.use(SecurityExceptionHandler())
app.use(publicRoutes.routes())
app.use(publicRoutes.allowedMethods())
app.use(Jwt({ secret: Buffer.from(process.env.ASYMMETRIC_PUBLIC_KEY) }, { algorithm: 'RS256' }))
app.use(privateRoutes.routes())
app.use(privateRoutes.allowedMethods())
app.listen(properties.port, () => logger.log('info', `Application running on port ${properties.port}.`))

module.exports = app