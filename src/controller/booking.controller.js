const mongoose = require('mongoose')
const Booking = require('../models/booking.model')
const Event = require('../models/event.model')
const QRCode = require('qrcode')
const { responder } = require('../constant/response')

exports.createBooking = async (req, res, next) => {
  try {
    const { id } = req.user.id
    const { event_id, pass_type, quantity, payment_status } = req.body

    if (!id || !event_id || !pass_type || !quantity || !payment_status) {
      return responder(res, 400, 'Missing required booking fields')
    }

    if (!mongoose.isValidObjectId(event_id)) {
      return responder(res, 400, 'Invalid ID')
    }

    const eventObjectId = new mongoose.Types.ObjectId(event_id)
    const event = await Event.findById(eventObjectId)

    if (!event) {
      return responder(res, 404, 'Event not found')
    }

    if (event.booked_count + quantity > event.max_capacity) {
      return responder(res, 400, 'Not enough slots available')
    }

    const selectedPass = event.pass_types.find(p => p.name === pass_type)
    if (!selectedPass) {
      return responder(res, 400, 'Invalid pass type selected')
    }

    const total_amount = selectedPass.price * quantity
    const qrPayload = `${id}-${event_id}-${Date.now()}`
    const qr_code = await QRCode.toDataURL(qrPayload)

    event.booked_count += quantity
    await event.save()

    const booking = new Booking({
      user_id: id,
      event_id: eventObjectId,
      pass_type,
      quantity,
      total_amount,
      payment_status,
      qr_code
    })

    const savedBooking = await booking.save()
    return responder(res, 201, 'Booking created successfully', { savedBooking })

  } catch (err) {
    console.error(err)
    return next(err)
  }
}
