const mongoose = require('../config/mongoose')
const fruitSchema = require('../schema/Fruit')

const FruitModel = mongoose.createModel('Fruit', fruitSchema)

module.exports = {
  findAll: async function () {
    return await FruitModel.find()
  },

  save: async function () {
    const x = new FruitModel()
    x.save(function (err, x) {
      if (err) return console.error(err);
    });

    return await fruit.find()
  },

  delete: async function () {
    return await fruit.find()
  }
}