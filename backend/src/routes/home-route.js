const KoaRouter = require('koa-router')
const service = require('../services/home-service')
const router = new KoaRouter()

router.get('/', service.get)
router.get('/favicon.ico', service.favicon)

module.exports = router.routes()