const mongoose = require('mongoose')

const passTypeSchema = new mongoose.Schema({
  type: String,
  name: String,
  price: Number
})

module.exports = passTypeSchema
