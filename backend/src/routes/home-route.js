const Router = require('koa-router')
const controller = require('../controller/home-controller')
const router = new Router()

router.get('/', controller.get)

module.exports = router.routes()