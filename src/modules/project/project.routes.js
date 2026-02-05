const express = require('express')
const router = express.Router()
const ProjectController = require('./project.controller')
const { tokenProvider } = require('../../middlewares/authMiddleware')
const { allowRoles } = require('../../middlewares/roleMiddleware')

const { uploadProjectImages, upload } = require('../../middlewares/uploadMiddleware')

router.get('/', tokenProvider, ProjectController.getAllProjects)
router.get('/user-projects', tokenProvider, ProjectController.getProjectsByUserId)
router.post('/', uploadProjectImages, tokenProvider, ProjectController.createProject)
router.post('/:id/images', upload.array('images'), ProjectController.addImages)
router.get('/:id', ProjectController.getProjectById)
router.patch('/:id/approve', tokenProvider, allowRoles('admin'), ProjectController.approveProject)
router.patch('/:id/denied', tokenProvider, allowRoles('admin'), ProjectController.deniedProject)

module.exports = router 