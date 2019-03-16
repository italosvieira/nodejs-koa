const FruitModel = require('../models/fruit')
const validateMongoId = require('../utils/validateMongoId')

module.exports = {
  get: async function (ctx) {
    ctx.body = await FruitModel.find().select(' name taste active ')
  },

  getById: async function (ctx) {
    await validateMongoId(ctx.params.id)
    ctx.body = await FruitModel.findOne({ _id: ctx.params.id }).select(' name taste active ')
  },

  post: async function (ctx) {
    const fruit = new FruitModel({
      name: ctx.request.body.name,
      taste: ctx.request.body.taste,
      active: ctx.request.body.active
    })

    ctx.body = await modelParser(await fruit.save())
  },

  put: async function (ctx) {
    await validateMongoId(ctx.request.body.id)

    ctx.body = await modelParser(await FruitModel.findOneAndUpdate({ _id: ctx.request.body.id }, {
      name: ctx.request.body.name,
      taste: ctx.request.body.taste,
      active: ctx.request.body.active
    }, { new: true }))
  },

  delete: async function (ctx) {
    await validateMongoId(ctx.params.id)
    ctx.body = await FruitModel.findOneAndDelete({ _id: ctx.params.id }).select(' name taste active ')
  }
}

async function modelParser (mongoDoc) {
  return { _id: mongoDoc._id, name: mongoDoc.name, taste: mongoDoc.taste, active: mongoDoc.active }
}