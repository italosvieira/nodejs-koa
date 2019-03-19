const KoaRouter = require('koa-router')
/* const roles = require('koa-jwt-roles') */
const service = require('../services/fruit-service')
const router = new KoaRouter({ prefix: '/api/private/fruits' })

/* TODO create roles middleware
 router.get('/', roles('admin'), service.get) */
router.get('/', service.get)
router.get('/:id', service.getById)
router.post('/', service.post)
router.put('/', service.put)
router.del('/:id', service.delete)

module.exports = router.routes()