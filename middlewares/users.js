const jwt = require('jsonwebtoken')
const signKey = require('../services/users').signKey

exports.setUser = (req, res, next) => {
  let token = req.get('Authorization')
  if (!token) {
    return next()
  }
  try {
    token = token.substring('Bearer '.length)
    const user = jwt.verify(token, signKey)
    req.user = user
    return next()
  } catch(e) {
    return next()
  }
}

exports.requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401)
    return res.json({
      message: "unauthorized"
    })
  }
  return next()
}
