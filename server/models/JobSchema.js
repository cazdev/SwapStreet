const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
   providerUserId: {type: String, required: false},
   title: {type: String, required: true},
   description: {type: String, required: true},
   location: {type: String, required: false},
   price: {type: Number, required: true},
   skill: {type: [String], required: false },
   clientUserId: {type: String, required: false},
   active:  {type: Boolean, required: false},
})

module.exports = mongoose.model('Job', JobSchema)