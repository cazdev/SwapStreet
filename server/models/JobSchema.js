const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
   providerUserId: {type: String, required: false},
   title: {type: String, required: true},
   description: {type: String, required: true},
   location: {type: Object, required: false},
   price: {type: Number, required: true},
   skill: {type: [String], required: false },
   clientUserId: {type: String, required: false},
   status:  {type: Number, required: true},
   swapReqUserId: {type: String, required: false},
})

module.exports = mongoose.model('Job', JobSchema)