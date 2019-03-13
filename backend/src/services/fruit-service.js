const Schema = require('mongoose').Schema

const mongoose = require('../config/mongoose')
const logRequest = require('../utils/logRequest')
const exceptionHandler = require('../handlers/exceptionHandler')
const validateMongoId = require('../utils/validateMongoId')

const FruitModel = mongoose.createModel('Fruit', new Schema({
  name: { type: String, required: true },
  taste: { type: String, required: true },
  active: Boolean
}))

module.exports = {
  get: async function (ctx) {
    logRequest(ctx)

    try {
      ctx.body = await FruitModel.find().select(' name taste active ')
    } catch (error) {
      exceptionHandler(ctx, error)
    }
  },

  getById: async function (ctx) {
    logRequest(ctx)

    try {
      await validateMongoId(ctx.params.id)
      ctx.body = await FruitModel.findOne({ _id: ctx.params.id }).select(' name taste active ')
    } catch (error) {
      exceptionHandler(ctx, error)
    }
  },

  post: async function (ctx) {
    logRequest(ctx)

    try {
      const fruit = new FruitModel({
        name: ctx.request.body.name,
        taste: ctx.request.body.taste,
        active: ctx.request.body.active
      })

      ctx.body = await modelParser(await fruit.save())
    } catch (error) {
      exceptionHandler(ctx, error)
    }
  },

  put: async function (ctx) {
    logRequest(ctx)

    try {
      await validateMongoId(ctx.request.body.id)

      ctx.body = await modelParser(await FruitModel.findOneAndUpdate({ _id: ctx.request.body.id }, {
        name: ctx.request.body.name,
        taste: ctx.request.body.taste,
        active: ctx.request.body.active
      }, { new: true }))
    } catch (error) {
      exceptionHandler(ctx, error)
    }
  },

  delete: async function (ctx) {
    logRequest(ctx)

    try {
      await validateMongoId(ctx.params.id)
      ctx.body = await FruitModel.findOneAndDelete({ _id: ctx.params.id }).select(' name taste active ')
    } catch (error) {
      exceptionHandler(ctx, error)
    }
  }
}

async function modelParser (mongoDoc) {
  return { _id: mongoDoc._id, name: mongoDoc.name, taste: mongoDoc.taste, active: mongoDoc.active }
}