const mongoose = require('mongoose')
const passTypeSchema = require('./pass.model')

const eventSchema = new mongoose.Schema({
  company_admin_id: String,
  title: String,
  date: Date,
  time: String,
  venue: String,
  description: String,
  max_capacity: Number,
  booked_count: {
    type: Number,
    default: 0
  },
  pass_types: [passTypeSchema],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
})

module.exports = mongoose.model('Event', eventSchema)
