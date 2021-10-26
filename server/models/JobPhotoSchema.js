const mongoose = require('mongoose')

const jobPhotoSchema = new mongoose.Schema({
    jobID: {
        type: String,
        required: true,
        trim: true
    }, 

    photo:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('JobPhoto', jobPhotoSchema)