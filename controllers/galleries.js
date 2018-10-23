const GalleryService = require('../services/galleries')

exports.createGallery = async (req, res) => {
  const gallery = {
    userId: req.body.userId,
    name: req.body.name
  }

  try {
    const created = await GalleryService.create(gallery)
    return res.json(created)
  } catch(e) {
    res.status(500)
    res.json({
      message: e.toString()
    })
  }
}

exports.getGalleryByUser = async (req, res) => {
  try {
    const userId = req.params['userId']
    if (!userId) {
      res.status(400)
      return res.json({
        message: "user not found"
      })
    }
    const galleries = await GalleryService.byUserID(userId)
    return res.json(galleries)
  } catch(e) {
    res.status(500)
    res.json({
      message: e.toString()
    })
  }
}