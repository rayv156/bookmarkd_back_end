const mongoose = require('mongoose')

const bookmarkSchema = mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String, required: false}
})

module.exports = mongoose.model('Bookmark', bookmarkSchema)