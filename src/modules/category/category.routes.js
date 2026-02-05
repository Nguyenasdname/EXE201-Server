const express = require('express')
const router = express.Router()
const CategogyController = require('./category.controller')

router.get('/', CategogyController.getAllCategories)

module.exports = router