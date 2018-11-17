const Koa = require('koa')
const Logger = require('koa-logger')
const Helmet = require('koa-helmet')
const Properties = require('./config/properties')
const Router = require('./routes/router')
const Mongo = require('./config/mongoDb')

const Cat = Mongo.createModel('Cat', { name: String })
const kitty = new Cat({ name: 'Zildjian' })
kitty.save().then(() => console.log('meow'))

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