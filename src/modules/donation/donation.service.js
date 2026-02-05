const Donation = require('./donation.model')

exports.getAllDonationByProjectId = async (projectId) => {
    const donations = await Donation.find({ projectId }).populate('donor')
    return donations
}

exports.createNewDonation = async (data) => {
    const donation = await Donation.findOne({
        donor: data.donor,
        projectId: data.projectId
    })

    if (donation) {
        donation.amount += data.amount
        donation.message = data.message
        return await donation.save()
    }

    const newDonation = new Donation({
        ...data
    })

    return await newDonation.save()
}