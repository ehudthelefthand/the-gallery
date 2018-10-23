const User = require('../models/user')

exports.register = async (req, res) => {
  const user = new User(req.body)
  try {
    const created = await user.save()
    res.json(created)
  } catch (e) {
    res.status(500)
    res.send(e)
  }
}

exports.login = (req, res) => {
  res.send('login')
}

exports.logout = (req, res) => {
  res.send('logout') 
}