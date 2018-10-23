const express = require('express')
const app = express()
const usersC = require('./controllers/users')
const backdoorC = require('./controllers/backdoor')
const port = 3000

// System routes
app.get('/', mw2, mw1, backdoorC.check, mwafter)

// User routes
app.post('/users', usersC.register)
app.post('/login', usersC.login)
app.post('/logout', usersC.logout)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
