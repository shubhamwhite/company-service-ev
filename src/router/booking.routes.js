const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler.middleware')
const { createBooking } = require('../controller/booking.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.route('/bookings').post(authMiddleware, createBooking)

router.use(errorHandler)

module.exports = router
