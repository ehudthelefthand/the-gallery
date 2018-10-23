const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: String,
  passwordHash: String
})

User.set('toJSON', {
  transform: function(doc, ret, options) {
    var retJson = {
      _id: ret._id,
      email: ret.email,
    };
    return retJson
  }
})

module.exports = mongoose.model('User', User)