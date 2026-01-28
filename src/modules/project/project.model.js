const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    projectName: { type: String, required: true },
    projectType: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    briefIntro: { type: String },
    brandImage: [{ type: String }],
    activityImage: [{ type: String }],
    summary: { type: String },
    brandStory: { type: String },
    videoLink: { type: String },
    totalCallValue: { type: Number },
    issueQuantity: { type: Number },
    openTime: { type: Date },
    capitalGoal: { type: String },
    businessName: { type: String },
    taxId: { type: String },
    bankAccount: { type: String },
    bankName: { type: String },
    transparencyCommitment: { type: String },
    officeAddress: { type: String },
    representative: { type: String },
    contactEmail: { type: String },
    phoneNumber: { type: String },
    status: { type: String, enum: ['process', 'active', 'completed', 'failed'], default: 'process' },
    createAt: { type: Date, default: Date.now }
})

projectSchema.index({ projectName: 'text', briefIntro: 'text' })

module.exports = mongoose.model('Project', projectSchema)