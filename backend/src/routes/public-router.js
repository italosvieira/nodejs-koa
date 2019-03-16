const KoaRouter = require('koa-router')
const home = require('./home-router')
const auth = require('./auth-router')

const router = new KoaRouter()
router.use(home)
router.use(auth)

module.exports = router