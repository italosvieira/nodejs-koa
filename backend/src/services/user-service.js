const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const validateMongoId = require('../utils/validateMongoId')
const authService = require('./auth-service')

module.exports = {
  get: async function (ctx) {
    ctx.body = await UserModel.find().select(' name email active roles permissions ')
  },

  getById: async function (ctx) {
    await validateMongoId(ctx.params.id)
    ctx.body = await UserModel.findOne({ _id: ctx.params.id }).select(' name email active roles permissions ')
  },

  post: async function (ctx) {
    const password = await bcrypt.hash(ctx.request.body.password, 10)

    const user = new UserModel({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: password,
      active: ctx.request.body.active || true,
      roles: ctx.request.body.roles || [],
      permissions: ctx.request.body.permissions || []
    })

    ctx.body = await modelParser(await user.save())
  },

  put: async function (ctx) {
    await validateMongoId(ctx.request.body.id)

    ctx.body = await modelParser(await UserModel.findOneAndUpdate({ _id: ctx.request.body.id }, {
      name: ctx.request.body.name,
      active: ctx.request.body.active,
      roles: ctx.request.body.roles,
      permissions: ctx.request.body.permissions
    }, { new: true }))
  },

  delete: async function (ctx) {
    await validateMongoId(ctx.params.id)
    ctx.body = await UserModel.findOneAndDelete({ _id: ctx.params.id }).select(' name email active roles permissions ')
  },

  changePassword: async function (ctx) {
    await validateMongoId(ctx.request.body.id)
    await authService.validateUserCredentials(ctx.request.body.email, ctx.request.body.oldPassword)

    const password = await bcrypt.hash(ctx.request.body.newPassword, 10)

    await modelParser(await UserModel.findOneAndUpdate({ _id: ctx.request.body.id }, { password: password }, { new: true }))

    ctx.body = 'Password changed successfully.'
  }
}

async function modelParser (mongoDoc) {
  return { _id: mongoDoc._id, email: mongoDoc.email, active: mongoDoc.active, roles: mongoDoc.roles, permissions: mongoDoc.permissions }
}