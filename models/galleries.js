const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Gallery = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

Gallery.set('toJSON', {
  transform: function(doc, ret, options) {
    var retJson = {
      _id: ret._id,
      name: ret.name
    };
    return retJson
  }
})

module.exports = mongoose.model('Gallery', Gallery)