const User = require('../models/users')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const runValidators = async (user, ...valFns) => {
  for (let fn of valFns) {
    try {
      await fn(user)
    } catch (e) {
      throw e
    }
  }
}

const requireEmail = (user) => {
  if (!user.email) throw new Error('email is required')
}

const uniqueEmail = async (user) => {
  try {
    const found = await User.findOne({ email: user.email })
    if (found) {
      throw new Error('email must be unique')
    }
  } catch(e) {
    throw e
  }
}

const normalizeEmail = (user) => {
  if (user.email) {
    user.email = user.email.toLowerCase()
    user.email = user.email.trim()
  }
}

const hashPassword = (user) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) return reject(err)
      user.passwordHash = hash
      resolve(user)
    })
  })
}

exports.create = async (data) => {
  try {
    await runValidators(data, 
      requireEmail,
      normalizeEmail,
      uniqueEmail,
      hashPassword)
    const user = new User(data)
    return await user.save()
  } catch(e) {
    throw e
  }
}

exports.login = async (data) => {
  try {
    await runValidators(data)
    const found = await User.findOne({ email: data.email })
    if (!found) {
      throw new Error('wrong credential')
    }
    const valid = await bcrypt.compare(data.password, found.passwordHash)
    if (!valid) {
      throw new Error('wrong credential')
    }
    return 'token'
  } catch(e) {
    throw e
  }
}

exports._getToken = (user) => {
  
}