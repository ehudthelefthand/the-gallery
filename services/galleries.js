const Gallery = require('../models/galleries')

exports.create = async (data) => {
  try {
    const gallery = new Gallery(data)
    return await gallery.save()
  } catch(e) {
    throw e
  } 
}

exports.byUserID = async (userId) => {
  try {
    return await Gallery.find({ userId: userId })
  } catch(e) {
    throw e
  } 
}