const express = require('express')
const router = express.Router()
const ProjectController = require('./project.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware')

const { uploadProjectImages, upload } = require('../../middlewares/uploadMiddleware')

router.post('/', uploadProjectImages, tokenProvider, ProjectController.createProject)
router.post('/:id/images', upload.array('images'), ProjectController.addImages)

module.exports = router