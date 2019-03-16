const KoaRouter = require('koa-router')
const service = require('../services/auth-service')
const router = new KoaRouter({ prefix: '/api/public/auth' })

router.post('/login', service.login)
router.post('/token', service.token)

module.exports = router.routes()