const Koa = require('koa')
const Logger = require('koa-logger')
const Helmet = require('koa-helmet')
const Mongoose = require('mongoose')
const Properties = require('./config/properties')
const Router = require('./routes/router')

const db = Mongoose.connect(Properties.mongo.url + '/' + Properties.mongo.dbName, { useNewUrlParser: true }).then(
  () => { console.log('Conected') },
  error => { console.log(error) }
)

if (Properties.isServerPropertiesInvalid) {
  console.log('Server Properties invalid.')
  process.exit(1)
}

const koa = new Koa()
koa.use(Logger())
koa.use(Helmet())
koa.use(Router.routes())
koa.use(Router.allowedMethods())

koa.listen(Properties.port, () => console.log(`Server running on port ${Properties.port}`))

module.exports = koa