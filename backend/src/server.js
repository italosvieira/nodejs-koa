const Koa = require('koa')
const Logger = require('koa-logger')
const Helmet = require('koa-helmet')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')

const Properties = require('./config/properties')
const Router = require('./routes/router')

if (Properties.isServerPropertiesInvalid) {
  console.log('Server Properties invalid.')
  process.exit(1)
}

const koa = new Koa()
koa.use(Logger())
koa.use(Helmet())
koa.use(Cors())
koa.use(BodyParser())
koa.use(Router.routes())
koa.use(Router.allowedMethods())

koa.use(BodyParser({
  onerror: function (error, ctx) {
    ctx.throw(422, `Couldn't parse the request.`)
  }
}))

koa.listen(Properties.port, () => console.log(`Server running on port ${Properties.port}`))

module.exports = koa