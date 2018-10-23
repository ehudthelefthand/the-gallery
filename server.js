const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const usersC = require('./controllers/users')
const backdoorC = require('./controllers/backdoor')
const port = 3000

// Connect DB first!
mongoose.connect('mongodb://localhost/gallery_local')

const jsonParser = bodyParser.json()
const urlencoded = bodyParser.urlencoded({
  extended: false
})

app.use(jsonParser)
app.use(urlencoded)

// System routes
app.get('/',backdoorC.check)

// User routes
app.post('/users', usersC.register)
app.post('/login', usersC.login)
app.post('/logout', usersC.logout)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
