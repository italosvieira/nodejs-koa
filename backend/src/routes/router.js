const Router = require('koa-router')
const fruits = require('./fruit-route')
const home = require('./home-route')

const router = new Router()
router.use(home)
router.use(fruits)

module.exports = router