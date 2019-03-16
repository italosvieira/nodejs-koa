const KoaRouter = require('koa-router')
const fruits = require('./fruit-router')
const users = require('./user-router')

const router = new KoaRouter()
router.use(fruits)
router.use(users)

module.exports = router