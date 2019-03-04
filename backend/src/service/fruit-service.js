const ServerUtils = require('../util/serverUtils')
const Mongoose = require('../config/mongoose')
const Schema = require('mongoose').Schema

const FruitModel = Mongoose.createModel('Fruit', new Schema({
  name: { type: String, required: true },
  taste: { type: String, required: true },
  active: Boolean
}))

module.exports = {
  get: async function (ctx) {
    try {
      ctx.body = await FruitModel.find()
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  },

  getById: async function (ctx) {
    // TODO
  },

  post: async function (ctx) {
    try {
      const x = new FruitModel({
        name: ctx.request.body.name,
        taste: ctx.request.body.taste,
        active: ctx.request.body.active
      })

      ctx.body = await f(await x.save())
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  },

  put: async function (ctx) {
    // TODO
  },

  delete: async function (ctx) {
    try {
      ctx.body = await f(await FruitModel.findOneAndDelete({ _id: ctx.params.id }))
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  }
}

async function f (mongoDoc) {
  return { id: mongoDoc._id, name: mongoDoc.name, taste: mongoDoc.taste, active: mongoDoc.active }
}