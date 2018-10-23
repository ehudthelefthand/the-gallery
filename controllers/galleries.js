const express = require('express')

module.exports = (galleryService) => {
  const createGallery = async (req, res) => {
    const gallery = {
      userId: req.user._id,
      name: req.body.name
    }
  
    try {
      const created = await galleryService.create(gallery)
      return res.json(created)
    } catch(e) {
      res.status(500)
      res.json({
        message: e.toString()
      })
    }
  }
  
  const getGalleryByUser = async (req, res) => {
    try {
      const userId = req.user._id
      if (!userId) {
        res.status(400)
        return res.json({
          message: "user not found"
        })
      }
      const galleries = await galleryService.byUserID(userId)
      return res.json(galleries)
    } catch(e) {
      res.status(500)
      res.json({
        message: e.toString()
      })
    }
  }

  const galleryRouter = express.Router()
  galleryRouter.post('/', createGallery)
  galleryRouter.get('/', getGalleryByUser)
  return galleryRouter
}