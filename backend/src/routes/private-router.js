const KoaRouter = require('koa-router')
const fruits = require('./fruit-route')

const router = new KoaRouter()
router.use(fruits)

module.exports = router