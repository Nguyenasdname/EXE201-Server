const express = require('express')
const router = express.Router()
const ProjectPackageController = require('./projectPackage.controller')

router.get('/', ProjectPackageController.getAllPackage)
router.get('/:packageId', ProjectPackageController.getPackageById)
router.post('/', ProjectPackageController.addNewPackage)

module.exports = router