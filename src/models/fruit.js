const mongoose = require('mongoose')

module.exports = mongoose.model('Fruit', new mongoose.Schema({
  name: { type: String, required: true },
  taste: { type: String, required: true },
  active: Boolean
}))