const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryName: String,
    categoryDesc:  String
})

module.exports = mongoose.model('Category', categorySchema)