const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const usersC = require('./controllers/users')
const galleryC = require('./controllers/galleries')
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
app.set('view engine', 'ejs')

app.use('/assets', express.static('assets'))

// System routes
app.get('/',backdoorC.check)

// User routes
app.post('/users', usersC.register)
app.post('/login', usersC.login)
app.post('/logout', usersC.logout)

// Gallery routes
app.post('/galleries', galleryC.createGallery)
app.get('/users/:userId/galleries', galleryC.getGalleryByUser)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
