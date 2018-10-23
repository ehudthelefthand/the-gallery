const fs = require('fs')

exports.create = (file, path, gallery) => {
  const existed = gallery.images.some((image) => {
    return image.filename === file.originalname
  })
  if (existed) {
    return
  }

  const imagePath = path + '/' + file.originalname
  fs.writeFileSync(imagePath, file.buffer)
  gallery.images.push({ filename: file.originalname }) 
}