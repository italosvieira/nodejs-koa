const KoaRouter = require('koa-router')
const service = require('../service/login-service')
const router = new KoaRouter({ prefix: '/api/public/login' })

router.post('/', service.post)

module.exports = router.routes()