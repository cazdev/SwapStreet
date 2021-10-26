const mongoose = require('mongoose');


const UserReviewSchema = new mongoose.Schema({
   providerUserId: {
       type: String, 
       ref: 'Provider',
       required: true
    },
   clientUserId:  {
       type: String,
       ref: 'Client',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        trim: true
    },
      isRecommended: {
        type: Boolean,
        default: true
    },
      updated: Date,
      created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', UserReviewSchema);



