const mongoose = require('mongoose')
const config = require('../config')
const color = require('../helper/color.helper')

exports.connectDB = async () => {
  try {
    await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    color.success('MongoDB Database connection has been established successfully.')
  } catch (error) {
    color.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
