const mongoose = require('../config/mongoose')
const fruitSchema = require('../schema/Fruit')

const FruitModel = mongoose.createModel('Fruit', fruitSchema)

module.exports = {
  findAll: async function () {
    return await FruitModel.find()
  },

  save: async function (fruit) {
    const x = new FruitModel({
      name: fruit.name,
      taste: fruit.taste,
      active: fruit.active
    })

    x.save(function (err, x) {
      if (err) {
        console.error(err)
      } else {
        return x
      }
    });
  },

  delete: async function (id) {
    FruitModel.findOneAndDelete( { _id: id }, (error, fruit) => {
      if (error) {
        console.log(error)
      } else {
        return fruit
      }
    })
  }
}