const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
   providerUserId: {type: String, required: true},
   comment: {type: String, required: true},
   clientUserId:  {type: String, required: true}
})

module.exports = mongoose.model('Comment', CommentSchema)