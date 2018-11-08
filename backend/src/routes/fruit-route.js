const Router = require('koa-router')
const controller = require('../controller/fruit-controller')
const router = new Router()

router.get('/fruits', controller.get)

module.exports = router.routes()