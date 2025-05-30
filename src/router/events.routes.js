const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const {
  createEvent,
  getEventsByAdmin
} = require('../controller/event.controller')

router.route('/create/admin').post(authMiddleware, createEvent)
router.route('/get/admin').get(authMiddleware, getEventsByAdmin)

router.use(errorHandler)

module.exports = router
