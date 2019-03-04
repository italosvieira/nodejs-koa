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
      ctx.body = await FruitModel.find().select(' name taste active ')
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  },

  getById: async function (ctx) {
    try {
      ctx.body = await FruitModel.findOne({ _id: ctx.params.id }).select(' name taste active ')
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  },

  post: async function (ctx) {
    try {
      const fruit = new FruitModel({
        name: ctx.request.body.name,
        taste: ctx.request.body.taste,
        active: ctx.request.body.active
      })

      ctx.body = await modelParser(await fruit.save())
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  },

  put: async function (ctx) {
    try {
      ctx.body = await modelParser(await FruitModel.findOneAndUpdate({ _id: ctx.request.body.id }, {
        name: ctx.request.body.name,
        taste: ctx.request.body.taste,
        active: ctx.request.body.active
      }, { new: true }))
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  },

  delete: async function (ctx) {
    try {
      ctx.body = await FruitModel.findOneAndDelete({ _id: ctx.params.id }).select(' name taste active ')
    } catch (error) {
      ServerUtils.handleError(ctx, 400, error)
    }
  }
}

async function modelParser (mongoDoc) {
  return { _id: mongoDoc._id, name: mongoDoc.name, taste: mongoDoc.taste, active: mongoDoc.active }
}