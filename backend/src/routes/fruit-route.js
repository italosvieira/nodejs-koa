const KoaRouter = require('koa-router')
const controller = require('../controller/fruit-controller')
const router = new KoaRouter({ prefix: '/api/private/fruits' })

router.get('/', controller.get)
  .get('/:id', controller.getById)
  .post('/', controller.post)
  .put('/', controller.put)
  .del('/:id', controller.delete)

module.exports = router.routes()