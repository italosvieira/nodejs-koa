const Router = require('koa-router')
const router = new Router()
const api = new Router({
  prefix: '/api'
})

const fruits = require('./fruit-route')
const home = require('./home-route')

router.use(fruits)
router.use(home)
router.use(api.routes())

module.exports = router