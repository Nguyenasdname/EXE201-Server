const mongoose = require('mongoose')

const projectPackageSchema = mongoose.Schema({
    packageName: { type: String },
    packageTitle: { type: String },
    time: { type: Number },
    price: { type: Number },
    successFee: { type: Number }
})

module.exports = mongoose.model('ProjectPackage', projectPackageSchema)