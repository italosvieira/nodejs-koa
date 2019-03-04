const Router = require('koa-router')
const controller = require('../service/home-service')
const router = new Router()

router.get('/', controller.get)

module.exports = router.routes()