const UserService = require('../services/users')

exports.registerPage = (req, res) => {
  res.render('index')
}

exports.register = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  try {
    const created = await UserService.create(user)
    res.json(created)
  } catch (e) {
    res.status(500)
    res.json({
      message: e.toString()
    })
  }
}

exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    const token = await UserService.login(user)
    res.json({
      token: token
    })
  } catch (e) {
    res.status(500)
    res.json({
      message: e.toString()
    })
  }
}

exports.logout = (req, res) => {
  res.send('logout') 
}