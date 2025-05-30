const Event = require('../models/event.model')
const { responder } = require('../constant/response')

exports.createEvent = async (req, res, next) => {
  try {

    const { id } = req.user.id
    const { title, date, time, venue, description, max_capacity, pass_types } =
      req.body

    const event = new Event({
      company_admin_id: Number(id),
      title,
      date,
      time,
      venue,
      description,
      max_capacity,
      pass_types,
      created_at: new Date()
    })

    await event.save()
    return responder(res, 201, 'Event created successfully', {
      event
    })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

exports.getEventsByAdmin = async (req, res, next) => {
  try {
    const { id } = req.user.id

    const events = await Event.find({ company_admin_id: id })
    return responder(res, 200, 'All events retrieved successfully', {
      events
    })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}
