const express = require('express')
const mkdirp = require('mkdirp')

module.exports = (galleryService, imageService, multer) => {
  const createGallery = async (req, res) => {
    const gallery = {
      userId: req.user._id,
      name: req.body.name
    }
  
    try {
      const created = await galleryService.create(gallery)
      return res.json(_imageURL(created))
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
      let galleries = await galleryService.byUserID(userId)
      galleries = galleries.map(g => _imageURL(g))
      return res.json(galleries)
    } catch(e) {
      res.status(500)
      res.json({
        message: e.toString()
      })
    }
  }

  const uploadImage = async (req, res) => {
    const galleryId = req.params['id']
    if (!galleryId) {
      res.status(400)
      return res.json({
        message: "gallery not found"
      })
    }
    try {
      const gallery = await galleryService.byID(galleryId)
      if (!gallery) {
        res.status(400)
        return res.json({
          message: "gallery not found"
        })
      }
      const galleryDir = _createGalleryDir(gallery._id)
      for (let file of req.files) {
        imageService.create(file, galleryDir, gallery)
      }
      const updated = await gallery.save()
      res.json(_imageURL(updated))
    } catch(e) {
      res.status(500)
      res.json({
        message: e.toString()
      })
    }
  }

  const _createGalleryDir = (galleryId) => {
    const path = `${process.cwd()}/uploads/${galleryId}`
    mkdirp.sync(path)
    return path
  }

  const _imageURL = (gallery) => {
    const json = gallery.toJSON()
    json.images.forEach((m) => {
      m.url = `/uploads/${json._id}/${m.filename}`
      return m
    })
    return json
  }

  const upload = multer()
  const galleryRouter = express.Router()
  galleryRouter.post('/', createGallery)
  galleryRouter.get('/', getGalleryByUser)
  galleryRouter.post('/:id/upload', upload.array('photos'), uploadImage)
  return galleryRouter
}