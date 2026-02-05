const router = require('express').Router()
const DonationController = require('./donation.controller')

const { tokenProvider } = require('../../middlewares/authMiddleware')
const { allowRoles } = require('../../middlewares/roleMiddleware')

router.get('/:projectId', DonationController.getAllDonationByProjectId)
router.post('/', tokenProvider, DonationController.createNewDonation)

module.exports = router