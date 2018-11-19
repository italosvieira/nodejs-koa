const Mongo = require('../config/mongoDb')
const fruitSchema = require('../schema/Fruit')

const fruit = Mongo.createModel('Fruit', fruitSchema)

module.exports = {
  findAll: async function () {
    try {
      return await fruit.findOne()
    } catch (error) {
      console.log(error)
    }
  }
}