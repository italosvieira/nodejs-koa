const KoaRouter = require('koa-router')

const home = require('./home-route')
const login = require('./login-route')

const router = new KoaRouter()
router.use(home)
router.use(login)

module.exports = router