const Schema = require('mongoose').Schema

exports = new Schema({
  name: { type: String, required: true },
  taste: String,
  active: Boolean
})
