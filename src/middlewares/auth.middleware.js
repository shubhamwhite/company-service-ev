const jwt = require('jsonwebtoken')
const config = require('../config')
const CustomErrorHandler = require('../utils/CustomError')

const authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers['authorization']?.split(' ')[1]
  try {
    if (!token) {
      return next(CustomErrorHandler.unAuthorized('Unauthorized'))
    }
    const decoded = jwt.verify(token, config.get('JWT_SECRET'))

    req.user = decoded
    req.role = decoded
    console.log('Decoded user:', req.role.id.role)
    if (req.role.id.role !== 'company' && req.role.id.role !== 'user') {
      return next(CustomErrorHandler.unAuthorized('dsssd__Unauthorized'))
    }
    next()

  } catch (err) {
    return next(err)
  }
}

module.exports = authMiddleware
