const KoaRouter = require('koa-router')
const service = require('../services/home-service')
const router = new KoaRouter()

router.get('/', service.get)

module.exports = router.routes()