const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID: {
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

module.exports = mongoose.model('UserPhoto', userSchema)