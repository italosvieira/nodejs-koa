const service = require('../service/fruit-service')
const serverUtils = require('../util/serverUtils')

module.exports = {
  get: async function (ctx) {
    try {
      ctx.body = await service.findAll()
    } catch (error) {
      serverUtils.handleError(ctx, 400, error)
    }
  },

  getById: async function (ctx) {
    // TODO
  },

  post: async function (ctx) {
    try {
      ctx.body = await service.save(ctx.request.body)
    } catch (error) {
      serverUtils.handleError(ctx, 400, error)
    }
  },

  put: async function (ctx) {
    // TODO
  },

  delete: async function (ctx) {
    try {
      const id = ctx.params.id
      await service.delete(id)
    } catch (error) {
      serverUtils.handleError(ctx, 400, error)
    }
  }
}