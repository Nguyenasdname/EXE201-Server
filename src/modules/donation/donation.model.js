const mongoose = require('mongoose')

const donationSchema = mongoose.Schema({
    amount: { type: Number, required: true, min: 0 },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    anonymous: { type: Boolean, default: false },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
})

donationSchema.post('save', async function () {
    const Project = mongoose.model('Project')
    await Project.findByIdAndUpdate(this.projectId, { $inc: { currentAmount: this.amount } })
})

module.exports = mongoose.model('Donation', donationSchema)