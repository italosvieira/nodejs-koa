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

  post: async function (ctx) {
    ctx.body = ctx.request.body
    console.log(ctx.request.body)
    try {
      ctx.body = await service.findAll()
    } catch (error) {
      serverUtils.handleError(ctx, 400, error)
    }
  },

  put: async function (ctx) {
    ctx.body = ['Banana', 'Apple', 'Kiwi', 'Avocado', 'Pineapple']
  },

  delete: async function (ctx) {
    ctx.body = ['Banana', 'Apple', 'Kiwi', 'Avocado', 'Pineapple']
  }
}