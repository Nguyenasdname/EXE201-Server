const DonationService = require('./donation.service')

exports.getAllDonationByProjectId = async (req, res) => {
    const projectId = req.params.projectId
    try {
        const donations = await DonationService.getAllDonationByProjectId(projectId)
        res.status(200).json(donations)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.createNewDonation = async (req, res) => {
    const userId = req.user.id
    const data = req.body
    data.donor = userId
    try {
        const donation = await DonationService.createNewDonation(data)
        res.status(201).json(donation)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}