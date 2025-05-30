const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user_id: String,
  event_id: String,
  pass_type: String,
  quantity: Number,
  total_amount: Number,
  payment_status: String,
  booking_date: {
    type: Date,
    default: Date.now
  },
  qr_code: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
