const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema({
  filename: String
})

Image.set('toJSON', {
  transform: function(doc, ret, options) {
    var retJson = {
      _id: ret._id,
      filename: ret.filename
    };
    return retJson
  }
})

const Gallery = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  images: [Image]
})

Gallery.set('toJSON', {
  transform: function(doc, ret, options) {
    var retJson = {
      _id: ret._id,
      name: ret.name,
      images: ret.images
    };
    return retJson
  }
})

module.exports = mongoose.model('Gallery', Gallery)