const Koa = require('koa')
const Logger = require('koa-logger')
const Helmet = require('koa-helmet')

const properties = require('./config/properties')
const router = require('./routes/router')

if (properties.isServerPropertiesInvalid) {
  console.log('Server Properties invalid.')
  process.exit(1)
}

const koa = new Koa()
koa.use(Logger())
koa.use(Helmet())
koa.use(router.routes())
koa.use(router.allowedMethods())

koa.listen(properties.port, () => console.log(`Server running on port ${properties.port}`))

module.exports = koa