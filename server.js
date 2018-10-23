const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userMw = require('./middlewares/users')
const usersC = require('./controllers/users')
const galleryC = require('./controllers/galleries')
const backdoorC = require('./controllers/backdoor')
const config = require('./configs')
const port = 3000

// Connect DB first!
mongoose.connect(config.mongo)

const jsonParser = bodyParser.json()
const urlencoded = bodyParser.urlencoded({
  extended: false
})

app.use(jsonParser)
app.use(urlencoded)
app.set('view engine', 'ejs')

app.use('/uploads', express.static('uploads'))
app.use(userMw.setUser)

// System routes
app.get('/', backdoorC.check)

// User routes
app.post('/users', usersC.register)
app.post('/login', usersC.login)
app.post('/logout', usersC.logout)

// Gallery routes
app.use('/galleries', userMw.requireUser, galleryC(
  require('./services/galleries'),
  require('./services/images'),
  require('multer')
))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
