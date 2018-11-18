const service = require('../service/fruit-service')

module.exports = {
  get: async function (ctx) {
    ctx.body = service.findAll()
  },

  post: async function (ctx) {
    ctx.body = ['Banana', 'Apple', 'Kiwi', 'Avocado', 'Pineapple']
  },

  put: async function (ctx) {
    ctx.body = ['Banana', 'Apple', 'Kiwi', 'Avocado', 'Pineapple']
  },

  delete: async function (ctx) {
    ctx.body = ['Banana', 'Apple', 'Kiwi', 'Avocado', 'Pineapple']
  }
}