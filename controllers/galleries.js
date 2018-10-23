const GalleryService = require('../services/galleries')

exports.createGallery = async (req, res) => {
  const gallery = {
    userId: req.body.userId,
    name: req.body.name
  }

  try {
    const created = await GalleryService.create(gallery)
    res.json(created)
  } catch(e) {
    res.status(500)
    res.json({
      message: e.toString()
    })
  }
}