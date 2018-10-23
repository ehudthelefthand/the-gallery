const express = require('express')
const app = express()
const usersC = require('./controllers/users')
const backdoorC = require('./controllers/backdoor')
const port = 3000

const mw1 = (req, res, next) => {
  console.log('mw1')
  next()
}

const mw2 = (req, res, next) => {
  console.log('mw2')
  next()
}

const mwafter = (req, res, next) => {
  console.log('mw after')
}

const finalerror = (err, req, res, next) => {
  console.log(err)
}

const mwall = (req, res, next) => {
  console.log('mw all')
  res.send('ok again')
  next()
}

app.use(mwall)
app.use(finalerror)

// System routes
app.get('/', mw2, mw1, backdoorC.check, mwafter)

// User routes
// app.post('/users', usersC.register)
// app.post('/login', usersC.login)
// app.post('/logout', usersC.logout)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
