const Koa = require('koa')
const koaCors = require('@koa/cors')
const koaHelmet = require('koa-helmet')
const koaBodyParser = require('koa-bodyparser')

const Mongoose = require('./config/mongoose')
const AsymmetricKeysLoader = require('./config/asymmetricKeysLoader')
const EnvironmentVariablesValidator = require('./config/environmentVariablesValidator')

const logger = require('./config/winston')
const publicRoutes = require('./routes/public-router')
const privateRoutes = require('./routes/private-router')

async function start () {
  AsymmetricKeysLoader()
  EnvironmentVariablesValidator()
  await Mongoose()

  // Middleware is called on each request. Stuff that is loaded only once or is needed on middleware needs to be loaded prior. Remember to gzip stuff
  const app = new Koa()
  // Logger and respondetime middleware here.
  app.use(koaCors())
  app.use(koaHelmet())
  app.use(koaBodyParser())
  // Security validator middleware here
  /* app.use(SecurityExceptionHandler()) */
  app.use(publicRoutes.routes())
  app.use(publicRoutes.allowedMethods())
  // JWT middleware here.
  /* app.use(Jwt({ secret: Buffer.from(process.env.ASYMMETRIC_PUBLIC_KEY) }, { algorithm: 'RS256' })) */
  app.use(privateRoutes.routes())
  app.use(privateRoutes.allowedMethods())
  app.listen(process.env.NODE_PORT || 3000, () => logger.info(`Application running on port ${process.env.NODE_PORT || 3000}.`))
}

start()