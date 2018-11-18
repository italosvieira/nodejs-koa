const Router = require('koa-router')

const controller = require('../controller/fruit-controller')
const router = new Router({
  prefix: '/fruits'
})

router.get('/', controller.get)
router.post('/', controller.post)
router.put('/', controller.put)
router.delete('/', controller.delete)

module.exports = router.routes()